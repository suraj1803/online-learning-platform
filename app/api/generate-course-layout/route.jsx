import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import OpenAI from "openai";
import axios from "axios";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

const PROMPT = `
Genrate Learning Course depends on following details. In which Make sure to add Course Name, Description, Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3d format, Chapter Name, Topic under each chapters, Duration for each chapter, etc., in JSON format only.

Schema:

{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "includeVideo": "boolean",
    "noOfChapters": "number",
    "bannerImagePrompt": "string",
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": ["string"]
      }
    ]
  }
}

User Input:
`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { courseId, ...formData } = await req.json();
  const user = await currentUser();
  const { has } = await auth();
  const hasPremium = has({ plan: "starter" });

  async function main() {
    // ---------- OPENAI CALL ----------

    if (!hasPremium) {
      const result = await db
        .select()
        .from(coursesTable)
        .where(
          eq(coursesTable.userEmail, user?.primaryEmailAddress.emailAddress)
        );

      if (result?.length >= 1) {
        return NextResponse.json({ resp: "limit exceed" });
      }
    }
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: PROMPT + JSON.stringify(formData),
        },
      ],
    });

    let raw = completion.choices[0].message.content;

    // ---------- CLEAN JSON ----------
    raw = raw
      .replace(/```json/i, "")
      .replace(/```/g, "")
      .trim();

    const JSONResp = JSON.parse(raw);

    const ImagePrompt = JSONResp.course?.bannerImagePrompt;

    // ---------- IMAGE GENERATION USING AI GURU LAB (unchanged) ----------
    const bannerImageUrl = await GenerateImage(ImagePrompt);

    // ---------- SAVE IN DATABASE ----------
    await db.insert(coursesTable).values({
      ...formData,
      courseJson: JSONResp,
      userEmail: user.primaryEmailAddress.emailAddress,
      cid: courseId,
      bannerImageUrl: bannerImageUrl,
    });

    return NextResponse.json({ courseId });
  }

  return main();
}

// -------------------- AI GURU LAB IMAGE GENERATOR (unchanged) --------------------
async function GenerateImage(imagePrompt) {
  const BASE_URL = "https://aigurulab.tech";
  const result = await axios.post(
    BASE_URL + "/api/generate-image",
    {
      width: 1024,
      height: 1024,
      input: imagePrompt,
      model: "flux",
      aspectRatio: "16:9",
    },
    {
      headers: {
        "x-api-key": process.env.AI_GURU_LAB_API,
        "Content-Type": "application/json",
      },
    }
  );

  return result.data.image; // base64 output
}

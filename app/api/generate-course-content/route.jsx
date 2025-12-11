import { NextResponse } from "next/server";
import OpenAI from "openai";
import axios from "axios";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";

// ---------------- OpenAI Client ----------------
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PROMPT = `
Generate detailed HTML learning content for ALL chapters and topics.

Return STRICT JSON only.

Schema:
{
  "chapters": [
    {
      "chapterName": "string",
      "topics": [
        {
          "topic": "string",
          "content": "html string"
        }
      ]
    }
  ]
}

User Input:
`;

// ------------ Safe JSON cleaner ------------
function cleanJson(str) {
  return str
    .replace(/```json/i, "")
    .replace(/```/g, "")
    .trim();
}

// ------------ YouTube fetch ------------
async function GetYoutubeVideos(topic) {
  try {
    const params = {
      part: "snippet",
      q: topic,
      maxResults: 3,
      type: "video",
      key: process.env.YOUTUBE_API_KEY,
    };

    const resp = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      { params }
    );

    return resp.data.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
    }));
  } catch (err) {
    console.error("❌ YouTube API Error:", err.message);
    return [];
  }
}

export async function POST(req) {
  try {
    const { courseJson, courseTitle, courseId } = await req.json();

    // ----------------- SINGLE OPENAI CALL -----------------
    const userInput = JSON.stringify(courseJson.chapters);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        {
          role: "user",
          content: PROMPT + userInput,
        },
      ],
    });

    const raw = cleanJson(completion.choices[0].message.content);
    const parsed = JSON.parse(raw);

    // Add YouTube results for each topic
    for (const chapter of parsed.chapters) {
      for (const topic of chapter.topics) {
        topic.youtubeVideos = await GetYoutubeVideos(topic.topic);
      }
    }

    // Save to database
    await db
      .update(coursesTable)
      .set({ courseContent: parsed })
      .where(eq(coursesTable.cid, courseId));

    return NextResponse.json({
      courseName: courseTitle,
      courseContent: parsed,
    });
  } catch (err) {
    console.error("❌ API ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

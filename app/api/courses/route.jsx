import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams?.get("courseId");
  const user = await currentUser();

  // Fetch all courses
  if (courseId == 0) {
    const result = await db
      .select()
      .from(coursesTable)
      .where(sql`${coursesTable.courseContent}::jsonb != '{}'::jsonb`);

    console.log("fetching all courses", result);

    return NextResponse.json(result); // FIXED ✔
  }

  // Fetch single course
  if (courseId) {
    const result = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.cid, courseId));

    console.log("from GET: ", result);

    return NextResponse.json(result[0]); // OK
  }

  // Fetch user's courses
  const result = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.userEmail, user.primaryEmailAddress?.emailAddress))
    .orderBy(desc(coursesTable.id));

  console.log("from GET: ", result);

  return NextResponse.json(result); // already correct
}

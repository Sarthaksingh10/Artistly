import { NextResponse } from "next/server";

// Temporary in-memory storage
let submissions = [];

export async function POST(req) {
  const data = await req.json();
  submissions.push(data);

  /* console.log("New Submission:", data);  */
  return NextResponse.json({ success: true });
}

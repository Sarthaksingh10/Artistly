import { NextResponse } from "next/server";

let submissions = []; // in-memory storage

export async function POST(req) {
  const data = await req.json();

  submissions.push(data);
  return NextResponse.json({ success: true, submission: data });
}

export async function GET() {
  return NextResponse.json(submissions);
}

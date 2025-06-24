import db from "@/app/_data/db.json";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(db.artists);
}

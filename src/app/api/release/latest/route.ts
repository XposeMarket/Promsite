import { NextResponse } from "next/server";
import { getLatestRelease } from "@/lib/releases/github";

export const revalidate = 300; // cache 5 minutes

export async function GET() {
  return NextResponse.json(await getLatestRelease(), { status: 200 });
}

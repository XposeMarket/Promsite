import { NextResponse } from "next/server";

export const revalidate = 300; // cache 5 minutes

interface GitHubAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
  body: string;
  assets: GitHubAsset[];
}

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/repos/XposeMarket/prometheus-releases/releases/latest",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Prometheus-Website/1.0",
        },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ available: false }, { status: 200 });
    }

    const data: GitHubRelease = await res.json();
    const exeAsset = data.assets?.find((a) => a.name.endsWith(".exe"));

    return NextResponse.json({
      available: true,
      version: data.tag_name?.replace(/^v/, "") ?? data.name,
      tagName: data.tag_name,
      publishedAt: data.published_at,
      releaseUrl: data.html_url,
      downloadUrl: exeAsset?.browser_download_url ?? data.html_url,
      fileSize: exeAsset?.size ?? null,
    });
  } catch {
    return NextResponse.json({ available: false }, { status: 200 });
  }
}

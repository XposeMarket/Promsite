export interface ReleaseInfo {
  available: boolean;
  version?: string;
  tagName?: string;
  publishedAt?: string;
  releaseUrl?: string;
  downloadUrl?: string;
  fileSize?: number | null;
  macArm64?: ReleaseAsset;
  macX64?: ReleaseAsset;
}

export interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface GitHubRelease {
  tag_name?: string;
  name?: string;
  published_at?: string;
  html_url?: string;
  assets?: ReleaseAsset[];
}

const LATEST_RELEASE_URL =
  "https://api.github.com/repos/XposeMarket/prometheus-releases/releases/latest";

export async function getLatestRelease(): Promise<ReleaseInfo> {
  try {
    const res = await fetch(LATEST_RELEASE_URL, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Prometheus-Website/1.0",
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) return { available: false };

    const data: GitHubRelease = await res.json();
    const assets = data.assets ?? [];
    const exeAsset = assets.find((asset) => asset.name.endsWith(".exe"));
    const macArm64 = assets.find(
      (asset) => /-mac-arm64\.dmg$/i.test(asset.name),
    );
    const macX64 = assets.find((asset) => /-mac-x64\.dmg$/i.test(asset.name));

    return {
      available: true,
      version: data.tag_name?.replace(/^v/, "") ?? data.name,
      tagName: data.tag_name,
      publishedAt: data.published_at,
      releaseUrl: data.html_url,
      downloadUrl: exeAsset?.browser_download_url ?? data.html_url,
      fileSize: exeAsset?.size ?? null,
      macArm64,
      macX64,
    };
  } catch {
    return { available: false };
  }
}

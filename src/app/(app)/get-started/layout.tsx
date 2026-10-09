import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Get Started",
  description: "Set up Prometheus One on your machine.",
  path: "/get-started",
  noIndex: true,
});

export default function GetStartedLayout({ children }: { children: React.ReactNode }) {
  return children;
}

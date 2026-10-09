import { createMetadata } from "@/lib/seo/metadata";

// The page is a client component, so its metadata lives here.
export const metadata = createMetadata({
  title: "Contact the Prometheus Team",
  description:
    "Questions about Prometheus One, partnerships, press or support? Send the team a message and we will get back to you.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

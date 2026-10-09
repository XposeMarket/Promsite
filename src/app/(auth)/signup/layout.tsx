import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Create Your Free Account",
  description: "Create a free Prometheus account to download and use Prometheus One.",
  path: "/signup",
  noIndex: true,
});

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}

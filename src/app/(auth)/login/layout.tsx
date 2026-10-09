import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Log In",
  description: "Log in to your Prometheus account.",
  path: "/login",
  noIndex: true,
});

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}

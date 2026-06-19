import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { supabase } from "@/lib/auth/supabase";

let stripePromise: Promise<Stripe | null>;

export function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder",
    );
  }
  return stripePromise;
}

export const PLANS = {
  pro: {
    name: "Prometheus Free",
    price: 0,
    priceLabel: "Free",
    billingLabel: "free to use" as const,
    productId: "",
    priceId: "",
    features: [
      "Full AI system access",
      "Browser automation",
      "Background tasks & scheduling",
      "Persistent memory across sessions",
      "Team & subagent orchestration",
      "File & workflow execution",
      "Free access for everyone",
      "Community support",
    ],
  },
} as const;

type CheckoutOptions = {
  returnPath?: string;
};

export async function createCheckoutSession(
  priceId: string,
  options: CheckoutOptions = {},
) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const response = await fetch("/api/stripe/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(session?.access_token
        ? { Authorization: `Bearer ${session.access_token}` }
        : {}),
    },
    body: JSON.stringify({
      priceId,
      returnPath: options.returnPath || "/dashboard",
    }),
  });

  const payload = await response.json().catch(() => ({}));
  const error =
    typeof payload?.error === "string"
      ? payload.error
      : !response.ok
        ? "Checkout could not be started."
        : null;

  if (error) throw new Error(error);

  const url = typeof payload?.url === "string" ? payload.url : null;
  if (!url) throw new Error("Stripe did not return a checkout URL.");

  window.location.href = url;
}

export async function createPortalSession(customerId?: string) {
  if (!customerId) {
    throw new Error(
      "Billing portal is not required because Prometheus is free to use.",
    );
  }

  const response = await fetch("/api/stripe/portal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerId }),
  });

  const payload = await response.json().catch(() => ({}));
  const error =
    typeof payload?.error === "string"
      ? payload.error
      : !response.ok
        ? "Billing portal could not be opened."
        : null;

  if (error) throw new Error(error);

  const url = typeof payload?.url === "string" ? payload.url : null;
  if (!url) throw new Error("Stripe did not return a billing portal URL.");

  window.location.href = url;
}

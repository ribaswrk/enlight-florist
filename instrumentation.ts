// instrumentation.ts
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { registerOTel } from "@vercel/otel";

export async function register() {
  // Skip on Edge runtime (jaga-jaga kalau ada route Edge)
  if (process.env.NEXT_RUNTIME === "edge") return;

  registerOTel({
    serviceName: process.env.OTEL_SERVICE_NAME ?? "next-app",
    attributes: {
      [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]:
        process.env.OTEL_ENV ?? process.env.NODE_ENV ?? "development",
    },
    // Aktifkan auto instrumentation server-side (http, mysql, dll)
    instrumentations: ["auto"],
  });
}

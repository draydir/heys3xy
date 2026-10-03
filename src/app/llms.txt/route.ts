import { buildLlmsTxt, textResponse } from "@/lib/llms";

export const dynamic = "force-static";

export const GET = () => textResponse(buildLlmsTxt(), "text/plain");

import { buildLlmsFullTxt, textResponse } from "@/lib/llms";

export const dynamic = "force-static";

export const GET = () => textResponse(buildLlmsFullTxt(), "text/plain");

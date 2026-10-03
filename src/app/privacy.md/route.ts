import { PRIVACY_DOC } from "@/lib/legal-content";
import { legalDocToMarkdown, textResponse } from "@/lib/llms";

export const dynamic = "force-static";

export const GET = () => textResponse(`${legalDocToMarkdown(PRIVACY_DOC)}\n`, "text/markdown");

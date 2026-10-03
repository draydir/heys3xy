import { TERMS_DOC } from "@/lib/legal-content";
import { legalDocToMarkdown, textResponse } from "@/lib/llms";

export const dynamic = "force-static";

export const GET = () => textResponse(`${legalDocToMarkdown(TERMS_DOC)}\n`, "text/markdown");

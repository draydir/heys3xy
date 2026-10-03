import { Fragment } from "react";

interface RichTextProps {
  text: string;
}

export const RichText = ({ text }: RichTextProps) => (
  <>
    {text.split(/(\*\*[^*]+\*\*)/g).map((segment, index) => {
      const key = `${index}-${segment.slice(0, 12)}`;
      if (segment.startsWith("**") && segment.endsWith("**")) {
        return <strong key={key}>{segment.slice(2, -2)}</strong>;
      }
      return <Fragment key={key}>{segment}</Fragment>;
    })}
  </>
);

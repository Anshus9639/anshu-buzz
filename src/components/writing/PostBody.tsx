import type { ReactNode } from "react";
import type { PostBlock } from "@/data/posts";

function Inline({ text }: { text: string }): ReactNode {
  const parts = text.split(/(`[^`]+`)/g).filter(Boolean);

  return parts.map((part, index) =>
    part.startsWith("`") && part.endsWith("`") && part.length > 2 ? (
      <code
        key={index}
        className="border border-hairline bg-raised px-1.5 py-0.5 font-mono text-[0.82em] text-chalk"
      >
        {part.slice(1, -1)}
      </code>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="max-w-2xl space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={index}
                className="pt-6 font-display text-[1.6rem] font-medium leading-tight tracking-[-0.035em] text-chalk"
              >
                {block.text}
              </h2>
            );
          case "ul":
            return (
              <ul key={index} className="space-y-3">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[1.0625rem] leading-[1.75] text-chalk/80"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-3 size-1 shrink-0 bg-chalk"
                    />
                    <span>
                      <Inline text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l border-chalk py-1 pl-6 font-display text-xl leading-snug tracking-[-0.02em] text-chalk"
              >
                <Inline text={block.text} />
              </blockquote>
            );
          case "code":
            return (
              <pre
                key={index}
                className="overflow-x-auto border border-hairline bg-card p-5 font-mono text-[12px] leading-relaxed text-chalk/90"
              >
                <code>{block.code}</code>
              </pre>
            );
          default:
            return (
              <p
                key={index}
                className="text-[1.0625rem] leading-[1.75] text-chalk/80"
              >
                <Inline text={block.text} />
              </p>
            );
        }
      })}
    </div>
  );
}

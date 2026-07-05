import type { ContentBlock } from "@/lib/destinations";

function ListItem({
  item,
}: {
  item: string | { text: string; subItems?: string[] };
}) {
  if (typeof item === "string") {
    return <li className="leading-relaxed">{item}</li>;
  }

  return (
    <li className="leading-relaxed">
      {item.text}
      {item.subItems && item.subItems.length > 0 && (
        <ul className="mt-2 ml-5 list-disc space-y-1.5 text-ink-600">
          {item.subItems.map((sub) => (
            <li key={sub}>{sub}</li>
          ))}
        </ul>
      )}
    </li>
  );
}

function ContentBlockView({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-ink-700 leading-relaxed">{block.text}</p>;

    case "heading":
      if (block.level === 3) {
        return (
          <h3 className="text-xl font-semibold text-ink-900 tracking-tight">
            {block.text}
          </h3>
        );
      }
      return (
        <h2
          id={block.id}
          className="text-2xl font-semibold text-ink-900 tracking-tight pt-2 scroll-mt-24"
        >
          {block.text}
        </h2>
      );

    case "list":
      return (
        <ul className="list-disc pl-5 space-y-3 text-ink-700 marker:text-brand-500">
          {block.items.map((item) => (
            <ListItem
              key={typeof item === "string" ? item : item.text}
              item={item}
            />
          ))}
        </ul>
      );

    case "tip":
      return (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="text-sm font-semibold text-amber-900 uppercase tracking-wide mb-1">
            Tip
          </p>
          <p className="text-ink-700 leading-relaxed">{block.text}</p>
        </div>
      );

    case "image":
      return (
        <figure className="my-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            className="w-full rounded-xl object-cover aspect-[16/10] bg-ink-100"
          />
          {block.caption && (
            <figcaption className="mt-2 text-sm text-ink-500 italic text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    default:
      return null;
  }
}

export default function DestinationGuideContent({
  blocks,
}: {
  blocks: ContentBlock[];
}) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <ContentBlockView key={i} block={block} />
      ))}
    </div>
  );
}

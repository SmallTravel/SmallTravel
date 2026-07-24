import Link from "next/link";
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

function PlaceTeaser({
  block,
  stateSlug,
}: {
  block: Extract<ContentBlock, { type: "placeTeaser" }>;
  stateSlug?: string;
}) {
  const href =
    block.href ||
    (block.citySlug && stateSlug
      ? `/destinations/${stateSlug}/${block.citySlug}`
      : undefined);

  return (
    <article className="flex flex-col h-full">
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#e67e22]">
        {block.heading}
      </h2>

      {block.image.src && (
        <figure className="mt-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.image.src}
            alt={block.image.alt}
            loading="lazy"
            className="w-full object-cover aspect-[16/10] bg-ink-100"
          />
          {block.image.caption && (
            <figcaption className="mt-2 text-sm italic text-[#3498db]">
              {block.image.caption}
            </figcaption>
          )}
        </figure>
      )}

      {block.gettingThere && (
        <p className="mt-4 text-ink-800 leading-relaxed">
          <strong>Getting there:</strong> {block.gettingThere}
        </p>
      )}

      <div className="mt-3 space-y-3 flex-1">
        {block.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-ink-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {href && (
        <p className="mt-5 text-center">
          <Link
            href={href}
            className="inline-flex items-center justify-center px-5 py-2 rounded-md bg-[#e67e22] text-white text-sm font-medium hover:bg-[#d35400] transition"
          >
            {block.ctaLabel || "Read More"}
          </Link>
        </p>
      )}
    </article>
  );
}

function ContentBlockView({
  block,
  stateSlug,
}: {
  block: ContentBlock;
  stateSlug?: string;
}) {
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

    case "placeTeaser":
      return <PlaceTeaser block={block} stateSlug={stateSlug} />;

    default:
      return null;
  }
}

type GuideSegment =
  | { kind: "stack"; blocks: ContentBlock[] }
  | {
      kind: "placeGrid";
      blocks: Extract<ContentBlock, { type: "placeTeaser" }>[];
    };

/** Group consecutive place teasers into a 2-col grid like v1 (`col-lg-6`). */
function segmentBlocks(blocks: ContentBlock[]): GuideSegment[] {
  const segments: GuideSegment[] = [];

  for (const block of blocks) {
    if (block.type === "placeTeaser") {
      const last = segments[segments.length - 1];
      if (last?.kind === "placeGrid") {
        last.blocks.push(block);
      } else {
        segments.push({ kind: "placeGrid", blocks: [block] });
      }
      continue;
    }

    const last = segments[segments.length - 1];
    if (last?.kind === "stack") {
      last.blocks.push(block);
    } else {
      segments.push({ kind: "stack", blocks: [block] });
    }
  }

  return segments;
}

export default function DestinationGuideContent({
  blocks,
  stateSlug,
}: {
  blocks: ContentBlock[];
  stateSlug?: string;
}) {
  const segments = segmentBlocks(blocks);

  return (
    <div className="space-y-10">
      {segments.map((segment, segmentIndex) => {
        if (segment.kind === "stack") {
          return (
            <div key={`stack-${segmentIndex}`} className="max-w-3xl space-y-6">
              {segment.blocks.map((block, i) => (
                <ContentBlockView
                  key={`${block.type}-${i}`}
                  block={block}
                  stateSlug={stateSlug}
                />
              ))}
            </div>
          );
        }

        return (
          <div
            key={`grid-${segmentIndex}`}
            className="grid md:grid-cols-2 gap-x-8 gap-y-12"
          >
            {segment.blocks.map((block) => (
              <PlaceTeaser
                key={`${block.heading}-${block.citySlug ?? ""}`}
                block={block}
                stateSlug={stateSlug}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

export default function DestinationBreadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-ink-500">
      {crumbs.map((crumb, i) => (
        <span key={crumb.label} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-ink-300" />}
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-brand-700 transition">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-ink-700 font-medium">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

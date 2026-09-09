import { Link } from "@tanstack/react-router";
import { ArrowRight, Bookmark, BookmarkCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSavedTools } from "@/lib/saved-tools";
import { useLanguage } from "@/lib/i18n";
import type { AiTool } from "@/data/tools";

export function ToolCard({ tool }: { tool: AiTool }) {
  const { t } = useLanguage();
  const { isSaved, toggle } = useSavedTools();
  const saved = isSaved(tool.slug);

  return (
    <article className="card-hover group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-gradient text-base font-semibold text-primary-foreground">
          {tool.name.slice(0, 2).toUpperCase()}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold">{tool.name}</h3>
          <p className="text-xs text-muted-foreground">{tool.category}</p>
        </div>
        <button
          onClick={() => toggle(tool.slug)}
          aria-label={saved ? t("tool.saved") : t("tool.save")}
          className="ml-auto grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
        >
          {saved ? <BookmarkCheck className="size-4 text-primary" /> : <Bookmark className="size-4" />}
        </button>
      </div>

      <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">{tool.shortDescription}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <Badge variant="secondary">{tool.difficulty}</Badge>
        <Badge variant={tool.pricing === "Paid" ? "outline" : "default"}>{tool.pricing}</Badge>
      </div>

      <Button variant="ghost" size="sm" className="mt-5 justify-between px-2" asChild>
        <Link to="/tools/$slug" params={{ slug: tool.slug }}>
          {t("tool.learn")}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Button>
    </article>
  );
}

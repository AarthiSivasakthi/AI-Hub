import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToolCard } from "@/components/ToolCard";
import {
  CATEGORIES,
  DIFFICULTY_OPTIONS,
  PRICING_OPTIONS,
  TOOLS,
  type Difficulty,
  type Pricing,
} from "@/data/tools";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: "Explore 100+ AI Tools — AI Hub" },
      {
        name: "description",
        content:
          "Browse and filter 100+ AI tools by category, difficulty and pricing, then learn how each one works.",
      },
      { property: "og:title", content: "Explore 100+ AI Tools — AI Hub" },
      {
        property: "og:description",
        content: "Search, filter and bookmark AI tools across 20 categories.",
      },
    ],
  }),
  component: ToolsPage,
});

type Sort = "name" | "difficulty" | "category";

function ToolsPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [pricing, setPricing] = useState<Pricing | null>(null);
  const [sort, setSort] = useState<Sort>("name");
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const order: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];
    return TOOLS.filter(
      (tool) =>
        (!q ||
          tool.name.toLowerCase().includes(q) ||
          tool.shortDescription.toLowerCase().includes(q) ||
          tool.category.toLowerCase().includes(q)) &&
        (!category || tool.category === category) &&
        (!difficulty || tool.difficulty === difficulty) &&
        (!pricing || tool.pricing === pricing),
    ).sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : sort === "category"
          ? a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
          : order.indexOf(a.difficulty) - order.indexOf(b.difficulty) || a.name.localeCompare(b.name),
    );
  }, [query, category, difficulty, pricing, sort]);

  const clear = () => {
    setQuery("");
    setCategory(null);
    setDifficulty(null);
    setPricing(null);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">{t("tools.title")}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        {TOOLS.length} tools across {CATEGORIES.length} categories, each with a beginner lesson, quiz
        and practice activity.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("tools.search")}
            className="pl-9"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          aria-label="Sort tools"
        >
          <option value="name">Sort: A–Z</option>
          <option value="difficulty">Sort: Difficulty</option>
          <option value="category">Sort: Category</option>
        </select>
        <Button variant="outline" onClick={() => setShowFilters((v) => !v)} className="lg:hidden">
          <SlidersHorizontal className="size-4" />
          Filters
        </Button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
          <FilterGroup
            title={t("tools.category")}
            options={[...CATEGORIES]}
            value={category}
            onChange={setCategory}
            allLabel={t("tools.all")}
          />
          <FilterGroup
            title={t("tools.difficulty")}
            options={DIFFICULTY_OPTIONS}
            value={difficulty}
            onChange={(v) => setDifficulty(v as Difficulty | null)}
            allLabel={t("tools.all")}
          />
          <FilterGroup
            title={t("tools.pricing")}
            options={PRICING_OPTIONS}
            value={pricing}
            onChange={(v) => setPricing(v as Pricing | null)}
            allLabel={t("tools.all")}
          />
          <Button variant="ghost" size="sm" className="mt-4" onClick={clear}>
            {t("tools.clear")}
          </Button>
        </aside>

        <div>
          <p className="text-sm text-muted-foreground">
            {results.length} {t("tools.results")}
          </p>
          {results.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
              {t("tools.empty")}
            </div>
          ) : (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  options,
  value,
  onChange,
  allLabel,
}: {
  title: string;
  options: string[];
  value: string | null;
  onChange: (v: string | null) => void;
  allLabel: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-sm font-semibold">{title}</h2>
      <div className="mt-2 flex flex-wrap gap-1.5 lg:flex-col lg:items-start">
        <FilterChip label={allLabel} active={value === null} onClick={() => onChange(null)} />
        {options.map((opt) => (
          <FilterChip
            key={opt}
            label={opt}
            active={value === opt}
            onClick={() => onChange(value === opt ? null : opt)}
          />
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

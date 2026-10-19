import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { categoryCounts } from "@/data/tools";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "AI Tool Categories — AI Hub" },
      {
        name: "description",
        content:
          "Browse AI tools by category: assistants, writing, image, video, audio, coding, research, automation and more.",
      },
      { property: "og:title", content: "AI Tool Categories — AI Hub" },
      { property: "og:description", content: "20 categories covering the full AI tool landscape." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const counts = categoryCounts();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Categories</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Every tool on AI Hub belongs to one category, so you can go straight to the kind of work you
        want help with.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {counts.map((c) => (
          <Link
            key={c.category}
            to="/tools"
            className="card-hover group rounded-2xl border border-border bg-card p-5 shadow-card"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              {c.count} tools
            </p>
            <h2 className="mt-2 flex items-center gap-1.5 text-base font-semibold">
              {c.category}
              <ArrowRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

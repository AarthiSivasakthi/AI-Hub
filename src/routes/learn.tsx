import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { LEARNING_PATHS } from "@/data/paths";
import { getToolBySlug } from "@/data/tools";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "AI Learning Paths for Beginners — AI Hub" },
      {
        name: "description",
        content:
          "Follow structured AI learning paths for beginners, students, creators and developers, with lessons and matching tools.",
      },
      { property: "og:title", content: "AI Learning Paths for Beginners — AI Hub" },
      {
        property: "og:description",
        content: "Four guided paths from 'what is AI' to building with AI agents.",
      },
    ],
  }),
  component: LearnPage,
});

function LearnPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Learning paths</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Each path is a short course: read the lesson, watch a tutorial, take the quiz, then practise.
        Progress tracking arrives with accounts.
      </p>

      <div className="mt-10 space-y-8">
        {LEARNING_PATHS.map((path) => (
          <section key={path.slug} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-semibold">{path.title}</h2>
              <Badge variant="secondary">{path.level}</Badge>
              <Badge variant="outline">{path.lessons.length} lessons</Badge>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{path.summary}</p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <ol className="space-y-2">
                {path.lessons.map((lesson, i) => (
                  <li key={lesson} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary/60" />
                    <span className="text-muted-foreground">
                      {i + 1}. {lesson}
                    </span>
                  </li>
                ))}
              </ol>
              <div>
                <p className="text-sm font-semibold">Tools you will use</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {path.toolSlugs.map((slug) => {
                    const tool = getToolBySlug(slug);
                    if (!tool) return null;
                    return (
                      <Link
                        key={slug}
                        to="/tools/$slug"
                        params={{ slug }}
                        className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                      >
                        {tool.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

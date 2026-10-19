import { createFileRoute, Link, notFound, useRouter, type ErrorComponentProps } from "@tanstack/react-router";
import {
  Bookmark,
  BookmarkCheck,
  Clock,
  PlayCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PracticeBox } from "@/components/PracticeBox";
import { Quiz } from "@/components/Quiz";
import { ToolCard } from "@/components/ToolCard";
import { ExternalResource } from "@/components/ExternalResource";
import { buildLesson } from "@/data/lessonContent";
import { TOOLS, getToolBySlug } from "@/data/tools";
import { useLanguage } from "@/lib/i18n";
import { useSavedTools } from "@/lib/saved-tools";

export const Route = createFileRoute("/tools/$slug")({
  loader: ({ params }) => {
    const tool = getToolBySlug(params.slug);
    if (!tool) throw notFound();
    return { tool };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Tool not found — AI Hub" }, { name: "robots", content: "noindex" }] };
    }
    const { tool } = loaderData;
    const title = `${tool.name} — What it does and how to use it | AI Hub`;
    const description = `${tool.shortDescription} Beginner lesson, tutorial video, quiz and practice for ${tool.name}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ToolDetail,
  errorComponent: ToolError,
  notFoundComponent: () => (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="text-2xl font-semibold">Tool not found</h1>
      <Button asChild className="mt-4"><Link to="/tools">Explore AI tools</Link></Button>
    </div>
  ),
});

function ToolError({ reset }: ErrorComponentProps) {
  const router = useRouter();
  return <div className="mx-auto max-w-5xl px-4 py-14">
    <h1 className="text-2xl font-semibold">This lesson could not load</h1>
    <Button className="mt-4" onClick={async () => { await router.invalidate(); reset(); }}>Try again</Button>
  </div>;
}

function ToolDetail() {
  const { tool } = Route.useLoaderData();
  const { t } = useLanguage();
  const { isSaved, toggle } = useSavedTools();
  const lesson = buildLesson(tool);
  const saved = isSaved(tool.slug);
  const related = TOOLS.filter((x) => x.category === tool.category && x.slug !== tool.slug).slice(0, 3);

  return (
    <div>
      <header className="bg-hero-gradient">
        <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6">
          <Link to="/tools" className="text-sm text-primary-foreground/70 hover:text-primary-foreground">
            ← {t("tools.title")}
          </Link>
          <div className="mt-5 flex flex-wrap items-start gap-4">
            <span className="grid size-14 place-items-center rounded-2xl bg-accent-gradient text-lg font-semibold text-primary-foreground">
              {tool.name.slice(0, 2).toUpperCase()}
            </span>
            <div>
              <h1 className="text-3xl font-bold text-primary-foreground sm:text-4xl">{tool.name}</h1>
              <p className="mt-2 max-w-2xl text-primary-foreground/75">{tool.shortDescription}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{tool.category}</Badge>
            <Badge variant="secondary">{tool.difficulty}</Badge>
            <Badge variant="secondary">{tool.pricing}</Badge>
            <span className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/70">
              <Clock className="size-4" />
              {tool.learningMinutes} min lesson
            </span>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => toggle(tool.slug)}>
              {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
              {saved ? t("tool.saved") : t("tool.save")}
            </Button>
            {tool.websiteAvailable !== false ? (
              <ExternalResource href={tool.website} label="Visit website" />
            ) : (
              <p className="text-sm text-primary-foreground">Tome’s presentation service has closed.</p>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl space-y-10 px-4 py-14 sm:px-6">
        <Section title={`What is ${tool.name}?`}>
          <p className="text-muted-foreground">{lesson.what}</p>
        </Section>

        <Section title={`What can ${tool.name} do?`}>
          <BulletList items={lesson.canDo} />
        </Section>

        <Section title="Who should use it?">
          <p className="text-muted-foreground">{lesson.whoFor}</p>
        </Section>

        <Section title="Real-world examples">
          <BulletList items={lesson.examples} />
        </Section>

        <Section title="How to use it, step by step">
          <ol className="space-y-3">
            {lesson.steps.map((s, i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <span className="text-muted-foreground">{s}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Best beginner prompts">
          <div className="space-y-3">
            {lesson.prompts.map((p, i) => (
              <p key={i} className="rounded-xl border border-border bg-surface p-4 font-mono text-sm">
                {p}
              </p>
            ))}
          </div>
        </Section>

        <Section title={t("video.title")}>
          <div className="flex items-start gap-4">
            <PlayCircle className="size-10 shrink-0 text-primary" />
            <div className="min-w-0 space-y-3">
              <h3 className="font-semibold">{tool.name} beginner tutorials</h3>
              <ExternalResource href={`https://www.youtube.com/results?search_query=${encodeURIComponent(lesson.videoSearch)}`} label="Find tutorials on YouTube" />
              <p className="text-sm text-muted-foreground">If YouTube or a tool website stays blank, open the copied link in your browser. External sites may require sign-in or be unavailable in your region.</p>
            </div>
          </div>
        </Section>

        <div className="grid gap-5 md:grid-cols-3">
          <InfoCard title="Advantages" items={lesson.advantages} />
          <InfoCard title="Limitations" items={lesson.limitations} />
          <InfoCard title="Tips" items={lesson.tips} />
        </div>

        <Section title={t("quiz.title")}>
          <Quiz questions={lesson.quiz} />
        </Section>

        <PracticeBox
          brief={lesson.practice.brief}
          exampleAnswer={lesson.practice.exampleAnswer}
          keywords={lesson.practice.keywords}
        />

        {related.length > 0 && (
          <Section title={`More ${tool.category} tools`}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ToolCard key={r.id} tool={r} />
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold sm:text-2xl">{title}</h2>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm text-muted-foreground">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {items.map((i, k) => (
          <li key={k}>• {i}</li>
        ))}
      </ul>
    </div>
  );
}

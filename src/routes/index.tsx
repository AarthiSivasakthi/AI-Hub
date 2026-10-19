import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, CheckCircle2, GraduationCap, Layers, Sparkles, Wrench } from "lucide-react";

import heroImage from "@/assets/hero-dashboard.jpg";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/ToolCard";
import { FEATURED_TOOLS, CATEGORIES, TOOLS } from "@/data/tools";
import { LEARNING_PATHS } from "@/data/paths";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "AI Hub — Learn AI. Explore AI. Build with AI." },
      {
        name: "description",
        content:
          "Discover 100+ AI tools, follow beginner tutorials, watch curated videos, take quizzes and practise prompting on AI Hub.",
      },
      { property: "og:title", content: "AI Hub — Learn AI. Explore AI. Build with AI." },
      {
        property: "og:description",
        content: "A beginner-friendly home for 100+ AI tools, lessons, quizzes and practice.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useLanguage();

  const stats = [
    { icon: Wrench, value: `${TOOLS.length}+`, label: "AI tools" },
    { icon: Layers, value: `${CATEGORIES.length}`, label: "Categories" },
    { icon: BookOpen, value: "500+", label: "Learning resources" },
    { icon: CheckCircle2, value: `${TOOLS.length * 5}`, label: "Quiz questions" },
    { icon: Sparkles, value: `${CATEGORIES.length}`, label: "Practice activities" },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold text-primary-foreground/90">
              <GraduationCap className="size-3.5" />
              Free, beginner-friendly AI education
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] text-primary-foreground sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
              {t("hero.sub")}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/tools">{t("hero.cta1")}</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/learn">{t("hero.cta2")}</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-primary-foreground/15 shadow-glow">
              <img
                src={heroImage}
                alt="Illustration of an AI learning dashboard with course progress, a tutorial video and an assistant chat"
                width={1280}
                height={960}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold sm:text-3xl">{t("stats.title")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("stats.note")}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <s.icon className="size-5 text-primary" />
              <p className="mt-4 text-2xl font-semibold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">{t("featured.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("featured.sub")}</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/tools">{t("featured.all")}</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {FEATURED_TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold sm:text-3xl">{t("paths.title")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("paths.sub")}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {LEARNING_PATHS.map((p) => (
            <Link
              key={p.slug}
              to="/learn"
              className="card-hover rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">{p.level}</p>
              <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
              <p className="mt-4 text-sm font-medium">{p.lessons.length} lessons</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

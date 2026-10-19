import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Globe2, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "About AI Hub — Our approach to teaching AI" },
      {
        name: "description",
        content:
          "AI Hub teaches AI in plain language: honest explanations, curated tutorials, quizzes and hands-on practice in English and Tamil.",
      },
      { property: "og:title", content: "About AI Hub — Our approach to teaching AI" },
      {
        property: "og:description",
        content: "Why AI Hub exists and how the learning experience is built.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const values = [
    {
      icon: BookOpen,
      title: "Plain language first",
      body: "Every lesson explains the tool as if you have never used AI before — no jargon, no hype.",
    },
    {
      icon: Sparkles,
      title: "Learn by doing",
      body: "Each tool page ends with a quiz and a practice activity so you actually try the skill.",
    },
    {
      icon: Globe2,
      title: "English and Tamil",
      body: "The interface switches between English and தமிழ் so language is never the barrier.",
    },
    {
      icon: ShieldCheck,
      title: "Honest about limits",
      body: "We show what each tool gets wrong and how to verify results before you rely on them.",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">About AI Hub</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        AI Hub is an independent educational platform built to make artificial intelligence
        understandable for beginners. It brings 100+ tools, structured lessons, curated tutorials,
        quizzes and practice into one place.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {values.map((v) => (
          <div key={v.title} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <v.icon className="size-5 text-primary" />
            <h2 className="mt-4 text-base font-semibold">{v.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold">Coming next</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Accounts, a personal dashboard, saved tools synced across devices, quiz history and streaks
          are the next stage. For now, saved tools are kept in this browser and the statistics shown
          on the home page are demo values.
        </p>
        <Button className="mt-5" asChild>
          <Link to="/tools">Explore AI tools</Link>
        </Button>
      </div>
    </div>
  );
}

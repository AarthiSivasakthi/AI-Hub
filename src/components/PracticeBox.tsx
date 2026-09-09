import { Lightbulb, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/i18n";

interface Props {
  brief: string;
  exampleAnswer: string;
  keywords: string[];
}

export function PracticeBox({ brief, exampleAnswer, keywords }: Props) {
  const { t } = useLanguage();
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState<string[] | null>(null);
  const [showExample, setShowExample] = useState(false);

  const evaluate = () => {
    const text = value.toLowerCase();
    const notes: string[] = [];
    const words = value.trim().split(/\s+/).filter(Boolean).length;

    notes.push(words < 12 ? "Add more detail — strong prompts usually run 15 words or more." : "Good length: there is enough detail for the tool to work with.");
    const hits = keywords.filter((k) => text.includes(k.toLowerCase()));
    notes.push(
      hits.length >= 2
        ? `You covered key ideas: ${hits.join(", ")}.`
        : "Try naming the goal, the audience and the format you want back.",
    );
    notes.push(
      /\b(\d+|five|ten|bullet|words?|slides?|table)\b/i.test(value)
        ? "Nice — you specified a concrete format or size."
        : "Adding a format ('5 bullet points', '120 words') makes results far more usable.",
    );
    setFeedback(notes);
  };

  return (
    <div id="practice" className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-primary" />
        <h3 className="text-lg font-semibold">{t("practice.title")}</h3>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{brief}</p>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={5}
        placeholder="Type your prompt or answer here..."
        className="mt-4"
      />
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" onClick={evaluate} disabled={!value.trim()}>
          {t("practice.submit")}
        </Button>
        <Button size="sm" variant="outline" onClick={() => setShowExample((v) => !v)}>
          <Lightbulb className="size-4" />
          {t("practice.example")}
        </Button>
        {feedback && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setValue("");
              setFeedback(null);
            }}
          >
            <RotateCcw className="size-4" />
            {t("practice.again")}
          </Button>
        )}
      </div>

      {feedback && (
        <ul className="mt-4 space-y-2 rounded-xl border border-border bg-surface p-4 text-sm text-muted-foreground">
          {feedback.map((f, i) => (
            <li key={i}>• {f}</li>
          ))}
        </ul>
      )}

      {showExample && (
        <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Example answer</p>
          <p className="mt-2 text-sm text-muted-foreground">{exampleAnswer}</p>
        </div>
      )}
    </div>
  );
}

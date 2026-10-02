import { Check, RotateCcw, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/lib/i18n";
import type { QuizQuestion } from "@/data/lessonContent";

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const q = questions[index];
  if (!q) return null;
  const score = answers.filter((a, i) => a === questions[i]?.correctIndex).length;

  const reset = () => {
    setIndex(0);
    setPicked(null);
    setAnswers([]);
    setDone(false);
  };

  const next = () => {
    if (index + 1 >= questions.length) setDone(true);
    else {
      setIndex(index + 1);
      setPicked(null);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <p className="text-sm text-muted-foreground">{t("quiz.score")}</p>
        <p className="mt-1 text-4xl font-semibold">
          {score}
          <span className="text-xl text-muted-foreground">/{questions.length}</span>
        </p>
        <Progress value={(score / questions.length) * 100} className="mt-4" />
        <ul className="mt-6 space-y-4">
          {questions.map((item, i) => {
            const ok = answers[i] === item.correctIndex;
            return (
              <li key={i} className="rounded-xl border border-border bg-surface p-4">
                <div className="flex items-start gap-2">
                  <span
                    className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
                      ok ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"
                    }`}
                  >
                    {ok ? <Check className="size-3" /> : <X className="size-3" />}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{item.question}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Correct answer: {item.options[item.correctIndex]}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.explanation}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={reset} variant="outline">
            <RotateCcw className="size-4" />
            {t("quiz.retry")}
          </Button>
          <Button asChild>
            <a href="#practice">{t("quiz.continue")}</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Question {index + 1} of {questions.length}
        </span>
        <span>{Math.round((index / questions.length) * 100)}%</span>
      </div>
      <Progress value={(index / questions.length) * 100} className="mt-3" />
      <h3 className="mt-6 text-lg font-semibold">{q.question}</h3>
      <div className="mt-4 space-y-2">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correctIndex;
          const state =
            picked === null
              ? "idle"
              : isCorrect
                ? "correct"
                : picked === i
                  ? "wrong"
                  : "idle";
          return (
            <button
              key={i}
              disabled={picked !== null}
              onClick={() => {
                setPicked(i);
                setAnswers((prev) => [...prev.slice(0, index), i]);
              }}
              className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition-colors ${
                state === "correct"
                  ? "border-success bg-success/10"
                  : state === "wrong"
                    ? "border-destructive bg-destructive/10"
                    : "border-border hover:border-primary hover:bg-muted"
              } ${picked !== null ? "cursor-default" : ""}`}
            >
              <span className="grid size-6 shrink-0 place-items-center rounded-md bg-muted text-xs font-semibold">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="mt-4 rounded-xl border border-border bg-surface p-4">
          <p className="text-sm font-semibold">
            {picked === q.correctIndex ? t("quiz.correct") : t("quiz.incorrect")}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{q.explanation}</p>
          <Button size="sm" className="mt-3" onClick={next}>
            {index + 1 >= questions.length ? t("quiz.score") : t("quiz.next")}
          </Button>
        </div>
      )}
    </div>
  );
}

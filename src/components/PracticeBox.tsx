import { Check, Lightbulb, RotateCcw, Sparkles, TriangleAlert } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/i18n";

interface Props {
  brief: string;
  exampleAnswer: string;
  keywords: string[];
}

type PromptType = "image" | "video" | "email" | "story" | "code" | "presentation" | "general";

interface Note {
  kind: "good" | "missing";
  text: string;
  example?: string;
}

const STOPWORDS = new Set([
  "a", "an", "the", "me", "my", "our", "your", "for", "of", "to", "in", "on", "at", "with", "and",
  "or", "please", "can", "could", "you", "i", "we", "it", "is", "are", "be", "want", "need", "give",
  "make", "create", "generate", "write", "do", "help", "some", "this", "that", "just", "use", "using",
]);

const TYPE_MATCHERS: { type: PromptType; test: RegExp }[] = [
  { type: "image", test: /\b(image|images|picture|pictures|photo|photos|logo|poster|art|drawing|thumbnail|banner|illustration)\b/ },
  { type: "video", test: /\b(video|videos|clip|clips|reel|reels|animation|movie)\b/ },
  { type: "email", test: /\b(email|emails|letter|reply|message)\b/ },
  { type: "story", test: /\b(story|stories|poem|essay|article|blog|post|caption|script)\b/ },
  { type: "code", test: /\b(code|function|program|website|bug)\b/ },
  { type: "presentation", test: /\b(presentation|presentations|slide|slides|deck|ppt)\b/ },
];

const SUBJECT_CHECKS: Record<PromptType, { text: string; example: string }> = {
  image: {
    text: "You named the type (an image) but not what it should show. Say the main thing in the picture.",
    example: '"an image of a fisherman casting his net at sunrise"',
  },
  video: {
    text: "You said video, but not what it should show. Say the main thing in the video.",
    example: '"a video of coffee being poured into a glass cup, slow motion"',
  },
  email: {
    text: "You said email, but not who it is to or what it should ask.",
    example: '"an email to my teacher asking for two extra days"',
  },
  story: {
    text: "You named the writing type, but not the topic. Say what it should be about.",
    example: '"a short story about a brave little firefly"',
  },
  code: {
    text: "You said code, but not what it should do. Say the task clearly.",
    example: '"a Python function that removes duplicate lines from a file"',
  },
  presentation: {
    text: "You said presentation, but not the topic. Say what the slides are about.",
    example: '"a 5-slide outline on AI in schools"',
  },
  general: {
    text: "Say exactly what you want. Name the task and the topic.",
    example: '"summarise this 3-page report in 5 bullet points"',
  },
};

const EXTRA_CHECKS: Record<PromptType, { text: string; example: string; test: RegExp }[]> = {
  image: [
    {
      text: "Say the look or style you want.",
      example: 'words like "cartoon style", "photorealistic", "watercolor"',
      test: /\b(realistic|photorealistic|cartoon|anime|3d|watercolor|oil|sketch|minimal|pixel|cinematic|flat|vector|painting|style)\b/,
    },
    {
      text: "Say the size or shape if it matters.",
      example: '"16:9", "square", "high resolution"',
      test: /(\d+\s*:\s*\d+|\b(4k|8k|hd|square|portrait|landscape|resolution|wide|wallpaper)\b)/,
    },
  ],
  video: [
    {
      text: "Say how long the video should be.",
      example: '"30 seconds", "1 minute"',
      test: /\b\d+\s*(s\b|sec|secs|second|seconds|m\b|min|mins|minute|minutes)\b/,
    },
    {
      text: "Say the style or mood.",
      example: '"slow motion", "bright and playful", "cinematic"',
      test: /\b(slow motion|timelapse|drone|cinematic|cartoon|realistic|playful|dramatic|aerial|close.?up|style|mood)\b/,
    },
  ],
  email: [
    {
      text: "Say who the email is for and the tone.",
      example: '"to my manager", "polite but confident"',
      test: /\b(manager|teacher|sir|madam|team|client|customer|friend|principal|parents|colleague|hr)\b/,
    },
    {
      text: "Say how long it should be.",
      example: '"about 100 words"',
      test: /\b\d+\s*(words?|lines?|paragraphs?)\b/,
    },
  ],
  story: [
    {
      text: "Say who will read it.",
      example: '"for a 5-year-old", "for my class newsletter"',
      test: /\b(kids?|child|children|year.?old|students?|readers?|audience|parents|teachers?)\b/,
    },
    {
      text: "Say how long it should be.",
      example: '"150 words", "one page"',
      test: /\b\d+\s*(words?|lines?|pages?|paragraphs?)\b/,
    },
  ],
  code: [
    {
      text: "Say the programming language.",
      example: '"in Python", "in JavaScript"',
      test: /\b(python|javascript|typescript|java|c\+\+|c#|sql|html|css|react|node)\b/,
    },
    {
      text: "Say what goes in and what should come out.",
      example: '"it takes a list of names and returns them sorted"',
      test: /\b(input|output|return|takes?|returns?|given)\b/,
    },
  ],
  presentation: [
    {
      text: "Say how many slides.",
      example: '"5 slides"',
      test: /\b\d+\b/,
    },
    {
      text: "Say who will watch it.",
      example: '"for parents", "for my classmates"',
      test: /\b(parents?|students?|teachers?|class|manager|team|audience|clients?)\b/,
    },
  ],
  general: [
    {
      text: "Say the format you want back.",
      example: '"5 bullet points", "a table", "100 words"',
      test: /\b(bullet|points?|table|list|words?|paragraph|steps?|slides?|lines?)\b|\b\d+\b/,
    },
    {
      text: "Say who it is for.",
      example: '"for a busy manager", "for beginners"',
      test: /\b(manager|teacher|student|beginner|team|customer|parent|audience|kids?)\b/,
    },
  ],
};

const STRONG_EXAMPLES: Record<PromptType, string> = {
  image:
    "Generate an image of a South Indian street food stall at night, with glowing lanterns and steam rising from the pans. Photorealistic style, wide shot, 16:9.",
  video:
    "Create a 30-second video of coffee being poured into a glass cup in slow motion, with warm morning light and close-up shots. No text on screen.",
  email:
    "Write a polite email of about 100 words to my manager asking for two extra days to finish the sales report. Mention that the data was delayed, promise delivery by Friday, and keep the tone confident.",
  story:
    "Write a 150-word bedtime story about a brave little firefly for a 5-year-old. Use simple words and end happily.",
  code:
    "Explain this JavaScript function line by line for a beginner. Say what the input and output are, and point out one edge case it does not handle.",
  presentation:
    "Create a 5-slide outline about AI in schools for parents. One line of speaker notes per slide, simple words, no jargon.",
  general:
    "Summarise this 3-page report for a busy manager in 5 bullet points. No jargon. Focus on sales numbers and the next steps.",
};

const FORMAT_TEST = /\b(bullet|points?|table|list|words?|paragraph|steps?|slides?|lines?)\b|\b\d+\b/;

function detectType(text: string): PromptType {
  const found = TYPE_MATCHERS.find((m) => m.test.test(text));
  return found ? found.type : "general";
}

function analyzePrompt(raw: string, keywords: string[]) {
  const text = raw.toLowerCase();
  const words = raw.trim().split(/\s+/).filter(Boolean);
  const type = detectType(text);
  const good: Note[] = [];
  const missing: Note[] = [];

  if (words.length >= 12) {
    good.push({ kind: "good", text: "Good length — there is enough detail for the AI to work with." });
  }
  if (FORMAT_TEST.test(text)) {
    good.push({ kind: "good", text: "Nice — you specified a concrete format or size." });
  }

  const hits = keywords.filter((k) => text.includes(k.toLowerCase()));
  if (hits.length >= 2) {
    good.push({ kind: "good", text: `You covered the key ideas for this exercise: ${hits.join(", ")}.` });
  } else if (words.length >= 8) {
    missing.push({
      kind: "missing",
      text: "Try naming the goal, the audience and the format you want back.",
      example: '"for a busy manager, in 5 bullet points, no jargon"',
    });
  }

  if (words.length < 5) {
    missing.push({
      kind: "missing",
      text: "Your prompt is very short. Add a few more details — good prompts usually have 10 to 20 words.",
    });
  }

  const contentWords = words
    .map((w) => w.replace(/[^a-z0-9]+/g, "").toLowerCase())
    .filter((w) => w.length > 0 && !STOPWORDS.has(w));
  if (contentWords.length < 2) {
    missing.push({ kind: "missing", ...SUBJECT_CHECKS[type] });
  }

  for (const check of EXTRA_CHECKS[type]) {
    if (!check.test.test(text)) {
      missing.push({ kind: "missing", text: check.text, example: check.example });
    }
  }

  return { notes: [...good, ...missing.slice(0, 4)], strong: STRONG_EXAMPLES[type] };
}

export function PracticeBox({ brief, exampleAnswer, keywords }: Props) {
  const { t } = useLanguage();
  const [value, setValue] = useState("");
  const [result, setResult] = useState<{ notes: Note[]; strong: string } | null>(null);
  const [showExample, setShowExample] = useState(false);

  const evaluate = () => setResult(analyzePrompt(value, keywords));

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
        {result && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setValue("");
              setResult(null);
            }}
          >
            <RotateCcw className="size-4" />
            {t("practice.again")}
          </Button>
        )}
      </div>

      {result && (
        <div className="mt-4 space-y-3">
          <ul className="space-y-3 rounded-xl border border-border bg-surface p-4 text-sm">
            {result.notes.map((n, i) => (
              <li key={i} className="flex gap-2">
                {n.kind === "good" ? (
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                ) : (
                  <TriangleAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
                )}
                <div>
                  <p>{n.text}</p>
                  {n.example && <p className="mt-1 text-muted-foreground">Try: {n.example}</p>}
                </div>
              </li>
            ))}
          </ul>
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              A stronger prompt to learn from
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{result.strong}</p>
          </div>
        </div>
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

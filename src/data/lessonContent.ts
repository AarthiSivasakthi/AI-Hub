import type { AiTool } from "./tools";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ToolLesson {
  what: string;
  canDo: string[];
  whoFor: string;
  examples: string[];
  steps: string[];
  prompts: string[];
  advantages: string[];
  limitations: string[];
  tips: string[];
  practice: { brief: string; exampleAnswer: string; keywords: string[] };
  quiz: QuizQuestion[];
  videoSearch: string;
}

const CATEGORY_BLURB: Record<string, string> = {
  "AI Assistants": "answering questions, drafting text and explaining ideas in a conversation",
  Writing: "drafting, rewriting and improving written text",
  "Image Generation": "creating pictures from written descriptions",
  "Video Generation": "creating or editing video clips",
  Audio: "recording, cleaning and transcribing sound",
  Music: "composing music and audio tracks",
  Coding: "writing, explaining and fixing software code",
  Education: "teaching, studying and practising new topics",
  Productivity: "organising work, notes and meetings",
  Research: "finding trustworthy sources and summarising them",
  Marketing: "planning campaigns and writing promotional content",
  Design: "creating visual layouts, logos and brand assets",
  Presentation: "building slide decks and talk outlines",
  Business: "supporting sales, support and operations decisions",
  "Data Analysis": "exploring data and explaining what it shows",
  Automation: "connecting apps so repetitive work happens by itself",
  "3D": "creating three-dimensional models and scenes",
  Voice: "turning text into natural spoken audio",
  Translation: "converting language while keeping the meaning",
  "AI Agents": "carrying out multi-step tasks with limited supervision",
};

const PRACTICE_BRIEFS: Record<string, { brief: string; example: string; keywords: string[] }> = {
  Writing: {
    brief: "Write a prompt that asks the AI to draft a professional email requesting a two-day deadline extension.",
    example:
      "Write a polite, 120-word email to my manager Priya requesting a two-day extension on the sales report. Mention that the data source was delayed, give a new delivery date of Friday, and keep the tone confident, not apologetic.",
    keywords: ["email", "tone", "word", "deadline", "manager"],
  },
  "Image Generation": {
    brief: "Write an image prompt for a futuristic Chennai skyline at sunset.",
    example:
      "A futuristic Chennai skyline at sunset, glass towers beside Marina Beach, warm orange and teal light, wide cinematic shot, soft haze, highly detailed, 16:9.",
    keywords: ["chennai", "sunset", "light", "shot", "detailed"],
  },
  Coding: {
    brief: "Write a prompt that asks the AI to explain an unfamiliar function line by line.",
    example:
      "Explain this JavaScript function line by line for a beginner, say what the input and output are, and point out one edge case it does not handle.",
    keywords: ["explain", "line", "beginner", "input", "edge"],
  },
  Research: {
    brief: "Write a research question and say what kind of sources would answer it reliably.",
    example:
      "Question: does daily 20-minute reading improve reading speed in Class 6 students? Reliable sources: peer-reviewed education journals from the last 10 years, with sample sizes above 100.",
    keywords: ["question", "sources", "study", "peer", "evidence"],
  },
  Presentation: {
    brief: "Write a prompt for a five-slide presentation outline on AI in schools.",
    example:
      "Create a 5-slide outline on AI in schools for a parent audience: title, why it matters, two safe use cases, one risk, and a closing action. One sentence of speaker notes per slide.",
    keywords: ["slide", "outline", "audience", "notes", "5"],
  },
};

const DEFAULT_PRACTICE = {
  brief: "Write a clear, specific instruction you would give this tool for a real task of your own.",
  example:
    "State the goal, the audience, the format you want back, and one constraint — for example: 'Summarise this 3-page report for a busy manager in 5 bullet points, no jargon.'",
  keywords: ["goal", "audience", "format", "specific"],
};

export function buildLesson(tool: AiTool): ToolLesson {
  const purpose = CATEGORY_BLURB[tool.category] ?? "working with AI";
  const p = PRACTICE_BRIEFS[tool.category] ?? DEFAULT_PRACTICE;

  return {
    what: `${tool.name} is an AI tool in the ${tool.category} category. ${tool.shortDescription} In simple words, it helps you with ${purpose}, and you guide it by describing what you want in ordinary language.`,
    canDo: [
      `Help with ${purpose} without special technical setup`,
      "Turn a short instruction into a usable first draft",
      "Repeat the same kind of task quickly and consistently",
      "Explain its own output when you ask follow-up questions",
    ],
    whoFor: `${tool.name} suits ${tool.difficulty.toLowerCase()} users — students, teachers, creators and professionals who regularly need help with ${purpose}. Pricing is ${tool.pricing.toLowerCase()}, so you can judge the cost before committing.`,
    examples: [
      `A student uses ${tool.name} to get unstuck at the start of a task instead of staring at a blank page.`,
      `A small team uses ${tool.name} to save an hour of routine work every week.`,
      `A beginner uses ${tool.name} to compare two approaches before choosing one.`,
    ],
    steps: [
      `Open ${tool.website.replace(/^https?:\/\//, "")} and create a free account`,
      "Start a new project or conversation",
      "Write a clear instruction: goal, audience, format",
      "Review what comes back and note what is wrong",
      "Improve your instruction and run it again",
      "Verify anything factual before you use it",
    ],
    prompts: [
      `Explain what ${tool.name} is best at, in 5 simple bullet points.`,
      `I am a beginner. Give me a 10-minute first exercise for ${tool.name}.`,
      `Review my work and suggest three specific improvements, with reasons.`,
    ],
    advantages: [
      "Saves time on first drafts and repetitive work",
      "Lowers the barrier for beginners",
      `Strong fit for ${tool.category.toLowerCase()} tasks`,
    ],
    limitations: [
      "Can state wrong facts confidently — always verify",
      "Output can feel generic without a specific prompt",
      "Free plans usually limit usage or quality",
    ],
    tips: [
      "Give context and an example of what 'good' looks like",
      "Ask for a format: bullet points, table, 100 words",
      "Iterate — the second prompt is usually much better than the first",
    ],
    practice: { brief: p.brief, exampleAnswer: p.example, keywords: p.keywords },
    videoSearch: `${tool.name} tutorial for beginners`,
    quiz: [
      {
        question: `What is the main purpose of ${tool.name}?`,
        options: [
          "Antivirus protection",
          `Helping with ${purpose}`,
          "Compressing video files",
          "Managing bank payments",
        ],
        correctIndex: 1,
        explanation: `${tool.name} sits in the ${tool.category} category, so its core job is ${purpose}.`,
      },
      {
        question: `Which pricing model does ${tool.name} use?`,
        options: shuffledPricing(tool.pricing),
        correctIndex: shuffledPricing(tool.pricing).indexOf(tool.pricing),
        explanation: `${tool.name} is listed as ${tool.pricing} on AI Hub.`,
      },
      {
        question: `What experience level is ${tool.name} listed for?`,
        options: ["Beginner", "Intermediate", "Advanced", "Expert only"],
        correctIndex: ["Beginner", "Intermediate", "Advanced", "Expert only"].indexOf(tool.difficulty),
        explanation: `AI Hub lists ${tool.name} as ${tool.difficulty}.`,
      },
      {
        question: "What is the safest habit when an AI tool gives you a fact?",
        options: [
          "Assume it is correct because AI is fast",
          "Check it against a reliable source",
          "Share it immediately",
          "Ask the same question again and trust the second answer",
        ],
        correctIndex: 1,
        explanation: "AI tools can sound confident and still be wrong, so verification is essential.",
      },
      {
        question: "Which prompt is more likely to produce a useful result?",
        options: [
          "Help me",
          "Write something good",
          "Summarise this report in 5 bullet points for a busy manager, no jargon",
          "Do the task",
        ],
        correctIndex: 2,
        explanation: "Specific goal, format and audience give the model enough to work with.",
      },
    ],
  };
}

function shuffledPricing(_current: string) {
  return ["Free", "Freemium", "Paid", "Free Trial"];
}

export interface LearningPath {
  slug: string;
  title: string;
  level: "Beginner" | "Intermediate" | "All levels";
  summary: string;
  lessons: string[];
  toolSlugs: string[];
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    slug: "ai-beginner",
    title: "AI Beginner",
    level: "Beginner",
    summary: "Start from zero: what AI is, how models work, and how to prompt them well.",
    lessons: [
      "What is AI?",
      "What is generative AI?",
      "What is an AI model?",
      "How ChatGPT works",
      "AI prompting basics",
      "AI image generation",
      "AI video generation",
      "AI research tools",
      "AI coding tools",
      "AI productivity tools",
    ],
    toolSlugs: ["chatgpt", "gemini", "perplexity", "dall-e-3", "notebooklm"],
  },
  {
    slug: "ai-for-students",
    title: "AI for Students",
    level: "Beginner",
    summary: "Research faster, take better notes, and build presentations without shortcuts on learning.",
    lessons: [
      "Asking better study questions",
      "Summarising sources honestly",
      "Notes and flashcards with AI",
      "Building a presentation outline",
      "Checking facts and citations",
    ],
    toolSlugs: ["notebooklm", "perplexity", "quizlet-ai", "gamma", "consensus"],
  },
  {
    slug: "ai-for-creators",
    title: "AI for Content Creators",
    level: "Intermediate",
    summary: "Write, design, film and score content with an AI production workflow.",
    lessons: [
      "Content ideas and scripting",
      "Image generation for thumbnails",
      "Short-form video editing",
      "Voiceovers and dubbing",
      "Background music and sound",
    ],
    toolSlugs: ["midjourney", "runway", "elevenlabs", "suno", "opus-clip"],
  },
  {
    slug: "ai-for-developers",
    title: "AI for Developers",
    level: "Intermediate",
    summary: "Pair-program with AI, review code, and orchestrate agents responsibly.",
    lessons: [
      "Code completion basics",
      "Editing whole files with AI",
      "Debugging with an assistant",
      "Working with model APIs",
      "Agents and automation",
    ],
    toolSlugs: ["github-copilot", "cursor", "claude-code", "langgraph", "n8n"],
  },
];

export const getPath = (slug: string) => LEARNING_PATHS.find((p) => p.slug === slug);

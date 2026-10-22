export type Pricing = "Free" | "Freemium" | "Paid" | "Free Trial";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface AiTool {
  id: string;
  slug: string;
  name: string;
  category: string;
  pricing: Pricing;
  difficulty: Difficulty;
  shortDescription: string;
  website: string;
  websiteAvailable?: boolean;
  featured: boolean;
  learningMinutes: number;
  tags: string[];
}

export const CATEGORIES = [
  "AI Assistants",
  "Writing",
  "Image Generation",
  "Video Generation",
  "Audio",
  "Music",
  "Coding",
  "Education",
  "Productivity",
  "Research",
  "Marketing",
  "Design",
  "Presentation",
  "Business",
  "Data Analysis",
  "Automation",
  "3D",
  "Voice",
  "Translation",
  "AI Agents",
] as const;

export const PRICING_OPTIONS: Pricing[] = ["Free", "Freemium", "Paid", "Free Trial"];
export const DIFFICULTY_OPTIONS: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];

type Row = [
  name: string,
  category: (typeof CATEGORIES)[number],
  pricing: Pricing,
  difficulty: Difficulty,
  shortDescription: string,
  website: string,
  featured?: boolean,
];

const ROWS: Row[] = [
  ["ChatGPT", "AI Assistants", "Freemium", "Beginner", "Chat-based assistant that answers questions, writes text and explains ideas.", "https://chatgpt.com", true],
  ["Claude", "AI Assistants", "Freemium", "Beginner", "Careful, long-context assistant that is strong at reading documents.", "https://claude.ai", true],
  ["Gemini", "AI Assistants", "Freemium", "Beginner", "Google's assistant, connected to Search, Docs and Gmail.", "https://gemini.google.com", true],
  ["Microsoft Copilot", "AI Assistants", "Freemium", "Beginner", "AI helper built into Windows and Microsoft 365 apps.", "https://copilot.microsoft.com", true],
  ["Perplexity", "Research", "Freemium", "Beginner", "AI answer engine that cites the sources behind every answer.", "https://perplexity.ai", true],
  ["Midjourney", "Image Generation", "Paid", "Intermediate", "Creates highly artistic images from short text prompts.", "https://midjourney.com", true],
  ["Canva Magic Studio", "Design", "Freemium", "Beginner", "Design tool with AI text, image and layout helpers built in.", "https://canva.com", true],
  ["Runway", "Video Generation", "Freemium", "Intermediate", "Generates and edits video clips with AI models.", "https://runwayml.com", true],
  ["ElevenLabs", "Voice", "Freemium", "Beginner", "Natural text-to-speech and voice cloning in many languages.", "https://elevenlabs.io", true],
  ["Cursor", "Coding", "Freemium", "Intermediate", "Code editor where AI edits whole files with you.", "https://cursor.com", true],
  ["GitHub Copilot", "Coding", "Paid", "Beginner", "Autocompletes code and explains snippets inside your editor.", "https://github.com/features/copilot", true],
  ["NotebookLM", "Education", "Free", "Beginner", "Turns your own notes and PDFs into summaries and audio overviews.", "https://notebooklm.google.com", true],
  ["Copy.ai", "Writing", "Freemium", "Beginner", "Generates marketing copy, emails and product descriptions.", "https://copy.ai"],
  ["Jasper", "Writing", "Paid", "Intermediate", "Brand-aware writing assistant for marketing teams.", "https://jasper.ai"],
  ["Grammarly", "Writing", "Freemium", "Beginner", "Checks grammar, tone and clarity as you write.", "https://grammarly.com"],
  ["QuillBot", "Writing", "Freemium", "Beginner", "Rewrites and shortens sentences while keeping the meaning.", "https://quillbot.com"],
  ["Notion AI", "Productivity", "Paid", "Beginner", "Summarises notes and drafts documents inside Notion.", "https://notion.so/product/ai"],
  ["Sudowrite", "Writing", "Paid", "Intermediate", "Fiction writing partner for stories and characters.", "https://sudowrite.com"],
  ["Writesonic", "Writing", "Freemium", "Beginner", "Blog and SEO article writer with research built in.", "https://writesonic.com"],
  ["Rytr", "Writing", "Freemium", "Beginner", "Simple short-form copywriting assistant.", "https://rytr.me"],
  ["DALL-E 3", "Image Generation", "Freemium", "Beginner", "Makes images from plain-language descriptions.", "https://openai.com/dall-e-3"],
  ["Stable Diffusion", "Image Generation", "Free", "Advanced", "Open-source image model you can run yourself.", "https://stability.ai"],
  ["Leonardo AI", "Image Generation", "Freemium", "Intermediate", "Image generation tuned for game and product art.", "https://leonardo.ai"],
  ["Ideogram", "Image Generation", "Freemium", "Beginner", "Image generator that renders readable text in posters.", "https://ideogram.ai"],
  ["Adobe Firefly", "Image Generation", "Freemium", "Beginner", "Commercially safe image and effect generation from Adobe.", "https://firefly.adobe.com"],
  ["Flux", "Image Generation", "Freemium", "Intermediate", "Fast, photorealistic open image model family.", "https://blackforestlabs.ai"],
  ["Recraft", "Design", "Freemium", "Intermediate", "Generates vectors, icons and brand-consistent art.", "https://recraft.ai"],
  ["Remove.bg", "Image Generation", "Freemium", "Beginner", "Removes image backgrounds in one click.", "https://remove.bg"],
  ["Magnific AI", "Image Generation", "Paid", "Intermediate", "Upscales and adds detail to existing images.", "https://magnific.ai"],
  ["Krea", "Image Generation", "Freemium", "Intermediate", "Real-time image generation and enhancement canvas.", "https://krea.ai"],
  ["Sora", "Video Generation", "Paid", "Intermediate", "Creates short cinematic video clips from text.", "https://openai.com/sora"],
  ["Pika", "Video Generation", "Freemium", "Beginner", "Turns images and prompts into short animated clips.", "https://pika.art"],
  ["Luma Dream Machine", "Video Generation", "Freemium", "Intermediate", "Generates smooth video from text or a single photo.", "https://lumalabs.ai"],
  ["Kling AI", "Video Generation", "Freemium", "Intermediate", "Longer AI video clips with strong motion control.", "https://klingai.com"],
  ["HeyGen", "Video Generation", "Paid", "Beginner", "Creates presenter videos with AI avatars.", "https://heygen.com"],
  ["Synthesia", "Video Generation", "Paid", "Beginner", "Studio-style training videos from a script.", "https://synthesia.io"],
  ["Descript", "Audio", "Freemium", "Beginner", "Edit audio and video by editing the transcript.", "https://descript.com"],
  ["CapCut AI", "Video Generation", "Freemium", "Beginner", "Auto captions, cuts and effects for social video.", "https://capcut.com"],
  ["Opus Clip", "Video Generation", "Freemium", "Beginner", "Turns long videos into short vertical clips.", "https://opus.pro"],
  ["Veed", "Video Generation", "Freemium", "Beginner", "Browser video editor with AI subtitles and cleanup.", "https://veed.io"],
  ["Whisper", "Audio", "Free", "Intermediate", "Open speech-to-text model with strong accuracy.", "https://openai.com/research/whisper"],
  ["Adobe Podcast", "Audio", "Free", "Beginner", "Cleans up noisy voice recordings automatically.", "https://podcast.adobe.com"],
  ["Krisp", "Audio", "Freemium", "Beginner", "Removes background noise from calls in real time.", "https://krisp.ai"],
  ["AssemblyAI", "Audio", "Freemium", "Advanced", "Speech-to-text API with summaries and topic detection.", "https://assemblyai.com"],
  ["Murf AI", "Voice", "Freemium", "Beginner", "Voiceovers for presentations and e-learning.", "https://murf.ai"],
  ["PlayHT", "Voice", "Freemium", "Beginner", "Realistic AI voices for podcasts and apps.", "https://play.ht"],
  ["Resemble AI", "Voice", "Paid", "Advanced", "Custom voice cloning with strict consent controls.", "https://resemble.ai"],
  ["Suno", "Music", "Freemium", "Beginner", "Creates full songs with vocals from a prompt.", "https://suno.com"],
  ["Udio", "Music", "Freemium", "Beginner", "Music generation with fine control over style.", "https://udio.com"],
  ["AIVA", "Music", "Freemium", "Intermediate", "Royalty-free soundtracks for videos and games.", "https://aiva.ai"],
  ["Soundraw", "Music", "Paid", "Beginner", "Generates background music you can customise.", "https://soundraw.io"],
  ["LALAL.AI", "Music", "Freemium", "Beginner", "Splits songs into vocals and instrument stems.", "https://lalal.ai"],
  ["Replit Agent", "Coding", "Freemium", "Beginner", "Builds and hosts small apps from a description.", "https://replit.com"],
  ["Windsurf", "Coding", "Freemium", "Intermediate", "AI-first editor that works across your whole repo.", "https://windsurf.com"],
  ["Claude Code", "Coding", "Paid", "Advanced", "Terminal coding agent for real repositories.", "https://claude.com/product/claude-code"],
  ["Codeium", "Coding", "Freemium", "Beginner", "Free code completion for many editors.", "https://devin.ai/desktop"],
  ["Tabnine", "Coding", "Freemium", "Intermediate", "Privacy-focused code completion for teams.", "https://tabnine.com"],
  ["Sourcegraph Cody", "Coding", "Freemium", "Intermediate", "Answers questions about large codebases.", "https://sourcegraph.com/cody"],
  ["CodeRabbit", "Coding", "Paid", "Advanced", "Automated AI code review on pull requests.", "https://coderabbit.ai"],
  ["v0", "Coding", "Freemium", "Beginner", "Generates React interfaces from prompts.", "https://v0.dev"],
  ["Bolt", "Coding", "Freemium", "Beginner", "Prompt-to-app builder that runs in the browser.", "https://bolt.new"],
  ["Khanmigo", "Education", "Paid", "Beginner", "Khan Academy's AI tutor for students and teachers.", "https://khanmigo.ai"],
  ["Duolingo Max", "Education", "Paid", "Beginner", "AI role-play and explanations for language learning.", "https://duolingo.com"],
  ["Quizlet AI", "Education", "Freemium", "Beginner", "Turns notes into flashcards and practice tests.", "https://quizlet.com"],
  ["Socratic", "Education", "Free", "Beginner", "Photo-based homework help with step-by-step hints.", "https://socratic.org"],
  ["Gradescope", "Education", "Paid", "Intermediate", "AI-assisted grading for teachers.", "https://gradescope.com"],
  ["Otter.ai", "Productivity", "Freemium", "Beginner", "Live meeting notes, transcripts and action items.", "https://otter.ai"],
  ["Fireflies.ai", "Productivity", "Freemium", "Beginner", "Records and summarises meetings automatically.", "https://fireflies.ai"],
  ["Mem", "Productivity", "Freemium", "Beginner", "Self-organising notes with AI search.", "https://mem.ai"],
  ["Reclaim AI", "Productivity", "Freemium", "Intermediate", "Schedules tasks and habits into your calendar.", "https://reclaim.ai"],
  ["Motion", "Productivity", "Paid", "Intermediate", "Plans your day and reorders tasks automatically.", "https://usemotion.com"],
  ["Superhuman", "Productivity", "Paid", "Beginner", "Fast email with AI drafting and summaries.", "https://superhuman.com"],
  ["Taskade", "Productivity", "Freemium", "Beginner", "AI project boards, notes and workflows.", "https://taskade.com"],
  ["Elicit", "Research", "Freemium", "Intermediate", "Finds and summarises academic papers.", "https://elicit.com"],
  ["Consensus", "Research", "Freemium", "Beginner", "Answers research questions from peer-reviewed studies.", "https://consensus.app"],
  ["Semantic Scholar", "Research", "Free", "Beginner", "Free academic search with AI summaries.", "https://semanticscholar.org"],
  ["Scite", "Research", "Paid", "Advanced", "Shows how papers support or dispute a claim.", "https://scite.ai"],
  ["Connected Papers", "Research", "Freemium", "Intermediate", "Visual map of related research papers.", "https://connectedpapers.com"],
  ["SciSpace", "Research", "Freemium", "Beginner", "Explains complex papers in simple language.", "https://typeset.io"],
  ["HubSpot AI", "Marketing", "Freemium", "Intermediate", "AI content and CRM assistance for marketers.", "https://hubspot.com"],
  ["Surfer SEO", "Marketing", "Paid", "Intermediate", "Optimises articles for search rankings.", "https://surferseo.com"],
  ["AdCreative.ai", "Marketing", "Paid", "Beginner", "Generates ad creatives and predicts performance.", "https://adcreative.ai"],
  ["Brandwatch", "Marketing", "Paid", "Advanced", "AI social listening and audience insight.", "https://brandwatch.com"],
  ["Buffer AI Assistant", "Marketing", "Freemium", "Beginner", "Writes and repurposes social posts.", "https://buffer.com"],
  ["Figma AI", "Design", "Freemium", "Intermediate", "Design suggestions and content fill inside Figma.", "https://figma.com"],
  ["Uizard", "Design", "Freemium", "Beginner", "Turns sketches and prompts into UI mockups.", "https://uizard.io"],
  ["Galileo AI", "Design", "Paid", "Intermediate", "Generates editable product UI designs.", "https://stitch.withgoogle.com"],
  ["Looka", "Design", "Paid", "Beginner", "Creates logos and brand kits automatically.", "https://looka.com"],
  ["Khroma", "Design", "Free", "Beginner", "Learns your taste and generates colour palettes.", "https://khroma.co"],
  ["Gamma", "Presentation", "Freemium", "Beginner", "Builds presentations and docs from a prompt.", "https://gamma.app"],
  ["Tome", "Presentation", "Freemium", "Beginner", "Narrative-style AI presentations.", "https://tome.app"],
  ["Beautiful.ai", "Presentation", "Paid", "Beginner", "Slides that design themselves as you type.", "https://beautiful.ai"],
  ["SlidesAI", "Presentation", "Freemium", "Beginner", "Turns text into Google Slides decks.", "https://slidesai.io"],
  ["Decktopus", "Presentation", "Paid", "Beginner", "Guided AI deck builder with speaker notes.", "https://decktopus.com"],
  ["Salesforce Einstein", "Business", "Paid", "Advanced", "AI predictions and assistants inside CRM.", "https://salesforce.com/einstein"],
  ["Intercom Fin", "Business", "Paid", "Intermediate", "AI support agent that resolves customer chats.", "https://intercom.com/fin"],
  ["Gong", "Business", "Paid", "Advanced", "Analyses sales calls and coaches reps.", "https://gong.io"],
  ["Clari", "Business", "Paid", "Advanced", "Revenue forecasting powered by AI.", "https://clari.com"],
  ["Harvey", "Business", "Paid", "Advanced", "AI assistant built for legal work.", "https://harvey.ai"],
  ["Julius AI", "Data Analysis", "Freemium", "Beginner", "Chat with spreadsheets and get charts back.", "https://julius.ai"],
  ["Polymer", "Data Analysis", "Freemium", "Beginner", "Turns spreadsheets into dashboards automatically.", "https://polymersearch.com"],
  ["Tableau Pulse", "Data Analysis", "Paid", "Intermediate", "Explains changes in your business metrics.", "https://tableau.com"],
  ["Hex Magic", "Data Analysis", "Freemium", "Advanced", "AI help for SQL and Python notebooks.", "https://hex.tech"],
  ["Akkio", "Data Analysis", "Paid", "Intermediate", "No-code predictive models for business teams.", "https://akkio.com"],
  ["Zapier AI", "Automation", "Freemium", "Beginner", "Builds automations between apps from a description.", "https://zapier.com/ai"],
  ["Make", "Automation", "Freemium", "Intermediate", "Visual automation builder with AI modules.", "https://make.com"],
  ["n8n", "Automation", "Freemium", "Advanced", "Open-source workflow automation with AI nodes.", "https://n8n.io"],
  ["Bardeen", "Automation", "Freemium", "Beginner", "Automates browser and spreadsheet busywork.", "https://bardeen.ai"],
  ["UiPath AI", "Automation", "Paid", "Advanced", "Enterprise robotic process automation with AI.", "https://uipath.com"],
  ["Spline AI", "3D", "Freemium", "Intermediate", "Generates 3D objects and scenes for the web.", "https://spline.design"],
  ["Luma Genie", "3D", "Free", "Beginner", "Creates 3D models from a text prompt.", "https://lumalabs.ai/genie"],
  ["Meshy", "3D", "Freemium", "Intermediate", "Text and image to 3D asset generation.", "https://meshy.ai"],
  ["Kaedim", "3D", "Paid", "Advanced", "Turns 2D concept art into game-ready 3D.", "https://kaedim3d.com"],
  ["DeepL", "Translation", "Freemium", "Beginner", "High-quality translation for documents and text.", "https://deepl.com"],
  ["Google Translate", "Translation", "Free", "Beginner", "Free translation for text, speech and images.", "https://translate.google.com"],
  ["HeyGen Translate", "Translation", "Paid", "Intermediate", "Dubs videos into new languages with lip sync.", "https://heygen.com"],
  ["Papago", "Translation", "Free", "Beginner", "Translation tuned for Asian languages.", "https://papago.naver.com"],
  ["AutoGPT", "AI Agents", "Free", "Advanced", "Experimental agent that chains tasks on its own.", "https://agpt.co"],
  ["CrewAI", "AI Agents", "Freemium", "Advanced", "Framework for teams of cooperating AI agents.", "https://crewai.com"],
  ["LangGraph", "AI Agents", "Free", "Advanced", "Builds reliable, stateful agent workflows.", "https://langchain.com/langgraph"],
  ["Manus", "AI Agents", "Paid", "Intermediate", "General agent that completes multi-step web tasks.", "https://manus.im"],
  ["Devin", "AI Agents", "Paid", "Advanced", "Autonomous software engineering agent.", "https://cognition.ai"],
  ["Operator", "AI Agents", "Paid", "Intermediate", "Agent that browses and clicks through websites for you.", "https://openai.com"],
];

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const minutesFor = (difficulty: Difficulty) =>
  difficulty === "Beginner" ? 30 : difficulty === "Intermediate" ? 45 : 60;

export const TOOLS: AiTool[] = ROWS.map(
  ([name, category, pricing, difficulty, shortDescription, website, featured], i) => ({
    id: String(i + 1),
    slug: slugify(name),
    name,
    category,
    pricing,
    difficulty,
    shortDescription,
    website,
    websiteAvailable: name !== "Tome",
    featured: Boolean(featured),
    learningMinutes: minutesFor(difficulty),
    tags: [category, difficulty, pricing],
  }),
);

export const FEATURED_TOOLS = TOOLS.filter((t) => t.featured);

export const getToolBySlug = (slug: string) => TOOLS.find((t) => t.slug === slug);

export const categoryCounts = () =>
  CATEGORIES.map((c) => ({ category: c, count: TOOLS.filter((t) => t.category === c).length }));

/** True only when the tool NAME itself starts with the query. */
export function nameStartsWithQuery(name: string, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return name.toLowerCase().startsWith(q);
}

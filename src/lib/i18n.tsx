import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ta";

const dict = {
  "nav.home": { en: "Home", ta: "முகப்பு" },
  "nav.tools": { en: "AI Tools", ta: "AI கருவிகள்" },
  "nav.learn": { en: "Learn", ta: "கற்க" },
  "nav.categories": { en: "Categories", ta: "வகைகள்" },
  "nav.about": { en: "About", ta: "எங்களைப் பற்றி" },
  "nav.login": { en: "Log in", ta: "உள்நுழை" },
  "nav.signup": { en: "Sign up", ta: "பதிவு செய்" },
  "hero.title": { en: "Learn AI. Explore AI. Build with AI.", ta: "AI கற்க. AI ஆராய. AI உடன் உருவாக்க." },
  "hero.sub": {
    en: "Discover 100+ AI tools, learn how they work, watch practical tutorials, test your knowledge, and build real skills — all in one place.",
    ta: "100+ AI கருவிகளை அறிந்து, அவை எப்படி வேலை செய்கின்றன என்பதைக் கற்று, பயிற்சி வீடியோக்களைப் பார்த்து, உங்கள் அறிவைச் சோதித்து, உண்மையான திறன்களை வளர்க்கவும்.",
  },
  "hero.cta1": { en: "Explore AI Tools", ta: "AI கருவிகளை ஆராய" },
  "hero.cta2": { en: "Start Learning", ta: "கற்க தொடங்கு" },
  "stats.title": { en: "A trusted learning experience", ta: "நம்பகமான கற்றல் அனுபவம்" },
  "stats.note": { en: "Demo values shown while the content library grows.", ta: "உள்ளடக்கம் வளரும் வரை மாதிரி எண்கள் காட்டப்படுகின்றன." },
  "featured.title": { en: "Featured AI tools", ta: "சிறப்பு AI கருவிகள்" },
  "featured.sub": { en: "Popular tools beginners usually start with.", ta: "தொடக்கநிலையாளர்கள் பொதுவாக தொடங்கும் கருவிகள்." },
  "featured.all": { en: "View all tools", ta: "அனைத்து கருவிகள்" },
  "paths.title": { en: "Learning paths", ta: "கற்றல் பாதைகள்" },
  "paths.sub": { en: "Structured routes from complete beginner to confident builder.", ta: "தொடக்கநிலையிலிருந்து தன்னம்பிக்கை வரை படிப்படியான பாதைகள்." },
  "tool.learn": { en: "Learn", ta: "கற்க" },
  "tool.save": { en: "Save", ta: "சேமி" },
  "tool.saved": { en: "Saved", ta: "சேமித்தது" },
  "tools.title": { en: "Explore AI tools", ta: "AI கருவிகளை ஆராயுங்கள்" },
  "tools.search": { en: "Search AI tools...", ta: "AI கருவிகளைத் தேடுங்கள்..." },
  "tools.category": { en: "Category", ta: "வகை" },
  "tools.difficulty": { en: "Difficulty", ta: "நிலை" },
  "tools.pricing": { en: "Pricing", ta: "விலை" },
  "tools.all": { en: "All", ta: "அனைத்தும்" },
  "tools.results": { en: "tools found", ta: "கருவிகள் கிடைத்தன" },
  "tools.clear": { en: "Clear filters", ta: "வடிகட்டிகளை நீக்கு" },
  "tools.empty": { en: "No tools match your filters yet.", ta: "உங்கள் வடிகட்டிக்கு கருவிகள் இல்லை." },
  "quiz.title": { en: "Test your knowledge", ta: "உங்கள் அறிவைச் சோதிக்கவும்" },
  "quiz.correct": { en: "Correct", ta: "சரி" },
  "quiz.incorrect": { en: "Not quite", ta: "தவறு" },
  "quiz.next": { en: "Next question", ta: "அடுத்த கேள்வி" },
  "quiz.score": { en: "Your score", ta: "உங்கள் மதிப்பெண்" },
  "quiz.retry": { en: "Retry quiz", ta: "மீண்டும் முயற்சி" },
  "quiz.continue": { en: "Continue learning", ta: "தொடர்ந்து கற்க" },
  "practice.title": { en: "Practice", ta: "பயிற்சி" },
  "practice.submit": { en: "Get feedback", ta: "கருத்து பெறு" },
  "practice.example": { en: "Show example answer", ta: "மாதிரி பதிலைக் காட்டு" },
  "practice.again": { en: "Try again", ta: "மீண்டும் முயற்சி" },
  "video.title": { en: "Video tutorial", ta: "வீடியோ பாடம்" },
  "footer.tagline": { en: "Learn AI. Explore AI. Build with AI.", ta: "AI கற்க. AI ஆராய. AI உடன் உருவாக்க." },
} as const;

export type TranslationKey = keyof typeof dict;

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}>({ lang: "en", setLang: () => {}, t: (k) => dict[k].en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("aihub-lang");
    if (stored === "ta" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("aihub-lang", l);
  };

  const t = (key: TranslationKey) => dict[key][lang] ?? dict[key].en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);

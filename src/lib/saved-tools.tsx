import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

const KEY = "aihub-saved-tools";

const SavedContext = createContext<{
  saved: string[];
  isSaved: (slug: string) => boolean;
  toggle: (slug: string) => void;
}>({ saved: [], isSaved: () => false, toggle: () => {} });

export function SavedToolsProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setSaved(JSON.parse(raw) as string[]);
    } catch {
      setSaved([]);
    }
  }, []);

  const toggle = useCallback((slug: string) => {
    setSaved((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      window.localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isSaved = useCallback((slug: string) => saved.includes(slug), [saved]);

  return <SavedContext.Provider value={{ saved, isSaved, toggle }}>{children}</SavedContext.Provider>;
}

export const useSavedTools = () => useContext(SavedContext);

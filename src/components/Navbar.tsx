import { Link } from "@tanstack/react-router";
import { Brain, Menu, Moon, Search, Sun, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

const links = [
  { to: "/", key: "nav.home" },
  { to: "/tools", key: "nav.tools" },
  { to: "/learn", key: "nav.learn" },
  { to: "/categories", key: "nav.categories" },
  { to: "/about", key: "nav.about" },
] as const;

export function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-accent-gradient text-primary-foreground">
            <Brain className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">AI Hub</span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "text-foreground bg-muted" }}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <Link
            to="/tools"
            aria-label="Search AI tools"
            className="hidden size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:grid"
          >
            <Search className="size-4" />
          </Link>

          <div className="hidden items-center rounded-lg border border-border p-0.5 sm:flex">
            {(["en", "ta"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-md px-2 py-1 text-xs font-semibold transition-colors ${
                  lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {l === "en" ? "EN" : "தமிழ்"}
              </button>
            ))}
          </div>

          <button
            onClick={toggle}
            aria-label="Toggle colour theme"
            className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid size-9 place-items-center rounded-lg text-muted-foreground lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 pb-4 lg:hidden">
          <nav className="flex flex-col py-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {t(l.key)}
              </Link>
            ))}
          </nav>
          <div className="flex flex-wrap items-center gap-2">
            {(["en", "ta"] as const).map((l) => (
              <Button key={l} variant={lang === l ? "default" : "outline"} size="sm" onClick={() => setLang(l)}>
                {l === "en" ? "English" : "தமிழ்"}
              </Button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

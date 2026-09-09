import { Link } from "@tanstack/react-router";
import { Brain } from "lucide-react";

import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-accent-gradient text-primary-foreground">
              <Brain className="size-5" />
            </span>
            <span className="text-lg font-semibold">AI Hub</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">{t("footer.tagline")}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Learn</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/tools" className="hover:text-foreground">
                AI tools
              </Link>
            </li>
            <li>
              <Link to="/learn" className="hover:text-foreground">
                Learning paths
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-foreground">
                Categories
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Platform</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-foreground">
                About AI Hub
              </Link>
            </li>
            <li>Accounts &amp; progress — coming soon</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} AI Hub. An independent educational project.
      </div>
    </footer>
  );
}

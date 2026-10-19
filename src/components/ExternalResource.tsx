import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExternalResource({ href, label }: { href: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      setCopyFailed(false);
    } catch {
      setCopyFailed(true);
    }
  }

  return (
    <div className="min-w-0 space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" asChild>
          <a href={href} target="_blank" rel="noopener noreferrer">{label}<ExternalLink /></a>
        </Button>
        <Button variant="ghost" size="icon" onClick={copyLink} title={copied ? "Link copied" : "Copy link"} aria-label={`Copy ${label} link`}>
          {copied ? <Check /> : <Copy />}
        </Button>
        <span role="status" className="text-sm text-muted-foreground">{copied ? "Link copied" : ""}</span>
      </div>
      <a href={href} target="_blank" rel="noopener noreferrer" className="block break-all text-xs text-muted-foreground underline underline-offset-4">{href}</a>
      {copyFailed && <p role="status" className="text-sm text-muted-foreground">Could not copy. Select and copy the link above.</p>}
    </div>
  );
}
import { describe, expect, it } from "bun:test";
import { TOOLS, getToolBySlug } from "./tools";

describe("official website destinations", () => {
  it("uses the current ChatGPT address", () => {
    expect(getToolBySlug("chatgpt")?.website).toBe("https://chatgpt.com");
  });
  it("does not offer the closed Tome service as available", () => {
    expect(getToolBySlug("tome")?.websiteAvailable).toBe(false);
  });
  it("provides an absolute HTTPS destination for every tool", () => {
    for (const tool of TOOLS) {
      const url = new URL(tool.website);
      expect(url.protocol).toBe("https:");
      expect(url.hostname.length).toBeGreaterThan(0);
    }
  });
});
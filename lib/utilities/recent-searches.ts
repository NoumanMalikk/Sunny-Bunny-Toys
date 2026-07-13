const STORAGE_KEY = "sunny-bunny-recent-searches";
const MAX_RECENT = 5;

export function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string").slice(0, MAX_RECENT)
      : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(query: string): void {
  const trimmed = query.trim();
  if (!trimmed || typeof window === "undefined") return;

  const existing = getRecentSearches().filter(
    (item) => item.toLowerCase() !== trimmed.toLowerCase(),
  );
  const next = [trimmed, ...existing].slice(0, MAX_RECENT);

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable */
  }
}

export function clearRecentSearches(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable */
  }
}

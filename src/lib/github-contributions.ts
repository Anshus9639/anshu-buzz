import { cacheLife } from "next/cache";
import { profile } from "@/data/profile";

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionWindow = {
  start: string;
  end: string;
  total: number;
  days: ContributionDay[];
};

const WINDOW_DAYS = 90;
const USERNAME =
  profile.links.github.handle?.replace(/^@/, "") ?? "Anshus9639";
const REQUEST_HEADERS = {
  "User-Agent": "anshu.buzz portfolio (https://anshu.buzz)",
  Accept: "text/html",
  "Accept-Language": "en-US,en;q=0.9",
};

function levelForCount(count: number): ContributionDay["level"] {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function toISODate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function parseCounts(html: string) {
  const tooltips = new Map<string, number>();

  for (const match of html.matchAll(
    /<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g,
  )) {
    const value = match[2].trim().match(/^([\d,]+)/);
    tooltips.set(match[1], value ? Number(value[1].replace(/,/g, "")) : 0);
  }

  const counts = new Map<string, number>();

  for (const match of html.matchAll(
    /<td\b([^>]*\bdata-date="[^"]+"[^>]*)>/g,
  )) {
    const id = match[1].match(/\bid="([^"]+)"/)?.[1];
    const date = match[1].match(/\bdata-date="([^"]+)"/)?.[1];
    const count = id ? tooltips.get(id) : undefined;

    if (!date || count === undefined) continue;
    counts.set(date, count);
  }

  return counts;
}

// GitHub answers with the whole calendar year of `to`, so a window crossing
// New Year is assembled from both years.
async function fetchYearCounts(year: number) {
  try {
    const response = await fetch(
      `https://github.com/users/${USERNAME}/contributions?from=${year}-01-01&to=${year}-12-31`,
      { headers: REQUEST_HEADERS },
    );

    if (!response.ok) return null;

    const counts = parseCounts(await response.text());
    return counts.size >= 360 ? counts : null;
  } catch {
    return null;
  }
}

export async function getContributionWindow(): Promise<ContributionWindow | null> {
  "use cache";
  cacheLife({ stale: 3600, revalidate: 86_400, expire: 172_800 });

  const end = new Date();
  end.setUTCHours(0, 0, 0, 0);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (WINDOW_DAYS - 1));

  const years = [...new Set([start.getUTCFullYear(), end.getUTCFullYear()])];
  const results = await Promise.all(years.map(fetchYearCounts));
  const counts = new Map<string, number>();

  for (const result of results) {
    if (!result) return null;
    for (const [date, count] of result) counts.set(date, count);
  }

  const days: ContributionDay[] = [];
  let total = 0;

  for (let offset = 0; offset < WINDOW_DAYS; offset += 1) {
    const cursor = new Date(start);
    cursor.setUTCDate(cursor.getUTCDate() + offset);
    const date = toISODate(cursor);
    const count = counts.get(date);

    if (count === undefined) return null;

    total += count;
    days.push({ date, count, level: levelForCount(count) });
  }

  return { start: toISODate(start), end: toISODate(end), total, days };
}
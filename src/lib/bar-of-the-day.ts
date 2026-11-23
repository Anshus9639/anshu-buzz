import {
  barsOfTheDay,
  type BarOfTheDayEntry,
} from "@/data/bar-of-the-day";

const istDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const profaneWords = [
  "motherfucker",
  "motherfuckers",
  "motherfucking",
  "fuck",
  "fucks",
  "fucking",
  "shit",
  "bitch",
  "bitches",
  "asshole",
  "assholes",
  "bastard",
  "bastards",
  "pussy",
  "dick",
  "dicks",
  "cock",
  "cocks",
  "slut",
  "sluts",
  "whore",
  "whores",
  "cunt",
];

export function censorAdultWords(text: string): string {
  return profaneWords
    .sort((a, b) => b.length - a.length)
    .reduce((censored, word) => {
      const pattern = new RegExp(`\\b${word}\\b`, "gi");
      return censored.replace(pattern, (match) => "*".repeat(match.length));
    }, text);
}

export function getBarOfTheDay(now = new Date()): BarOfTheDayEntry {
  const [year, month, day] = istDate.format(now).split("-").map(Number);
  // One step per IST day keeps the selection stable all day and avoids repeats.
  const days = Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
  const bar = barsOfTheDay[days % barsOfTheDay.length];

  return {
    ...bar,
    excerpt: censorAdultWords(bar.excerpt),
  };
}

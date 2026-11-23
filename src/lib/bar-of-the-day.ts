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

export function getBarOfTheDay(now = new Date()): BarOfTheDayEntry {
  const [year, month, day] = istDate.format(now).split("-").map(Number);
  // One step per IST day keeps the selection stable all day and avoids repeats.
  const days = Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
  return barsOfTheDay[days % barsOfTheDay.length];
}

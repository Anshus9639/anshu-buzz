"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type {
  ContributionDay,
  ContributionWindow,
} from "@/lib/github-contributions";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const LONG_DATE = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const SHORT_DATE = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

type TooltipState = {
  text: string;
  x: number;
  y: number;
  below: boolean;
};

function toDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function buildWeeks(days: ContributionDay[]) {
  const cells: Array<ContributionDay | null> = [
    ...Array<null>(toDate(days[0].date).getUTCDay()).fill(null),
    ...days,
  ];

  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: Array<Array<ContributionDay | null>> = [];
  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7));
  }
  return weeks;
}

function buildMonths(weeks: Array<Array<ContributionDay | null>>) {
  const months: Array<{ label: string; span: number }> = [];

  for (const week of weeks) {
    const first = week.find((day): day is ContributionDay => day !== null);
    if (!first) continue;

    const label = MONTHS[toDate(first.date).getUTCMonth()];
    const current = months[months.length - 1];

    if (current?.label === label) {
      current.span += 1;
    } else {
      months.push({ label, span: 1 });
    }
  }

  return months;
}

function countLabel(count: number) {
  if (count === 0) return "No contributions";
  return `${count} contribution${count === 1 ? "" : "s"}`;
}

function positionFor(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const below = rect.top < 64;
  const half = 124;

  return {
    x: Math.min(
      Math.max(rect.left + rect.width / 2, half),
      window.innerWidth - half,
    ),
    y: below ? rect.bottom + 8 : rect.top - 8,
    below,
  };
}

export function ContributionGraph({
  activity,
}: {
  activity: ContributionWindow;
}) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const activeCell = useRef<HTMLElement | null>(null);
  const tooltipText = useRef<string | null>(null);
  const scrollArea = useRef<HTMLDivElement | null>(null);
  const weeks = useMemo(() => buildWeeks(activity.days), [activity]);
  const months = useMemo(() => buildMonths(weeks), [weeks]);
  const range = `${SHORT_DATE.format(toDate(activity.start))} – ${SHORT_DATE.format(toDate(activity.end))}`;

  useEffect(() => {
    const reposition = () => {
      const element = activeCell.current;
      const text = tooltipText.current;
      if (!element || !text) return;

      const rect = element.getBoundingClientRect();
      const area = scrollArea.current?.getBoundingClientRect();
      const visible =
        rect.bottom > 0 &&
        rect.top < window.innerHeight &&
        (!area || (rect.right > area.left && rect.left < area.right));

      setTooltip(visible ? { text, ...positionFor(element) } : null);
    };

    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);

    return () => {
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
    };
  }, []);

  function showTooltip(day: ContributionDay, element: HTMLElement) {
    const text = `${SHORT_DATE.format(toDate(day.date))} · ${countLabel(day.count)}`;
    activeCell.current = element;
    tooltipText.current = text;
    setTooltip({ text, ...positionFor(element) });
  }

  function hideTooltip() {
    activeCell.current = null;
    tooltipText.current = null;
    setTooltip(null);
  }

  return (
    <>
      <p className="mt-2 mono-micro text-ash">
        <span className="text-chalk">{activity.total}</span> contributions
        {" · "}
        Last 90 days
      </p>

      <div
        ref={scrollArea}
        role="region"
        aria-label={`GitHub contribution activity, last 90 days: ${range}`}
        tabIndex={0}
        className="contribution-scroll mt-3 max-w-full overflow-x-auto pb-1"
      >
        <table
          role="grid"
          aria-readonly="true"
          aria-label="GitHub contributions for the last 90 days"
          className="contribution-grid min-w-max"
        >
          <caption className="sr-only">
            {`GitHub contributions from ${range}: ${activity.total} contributions across 90 days`}
          </caption>
          <thead>
            <tr>
              <th scope="col" aria-label="Day of week" />
              {months.map((month, index) => (
                <th
                  key={`${month.label}-${index}`}
                  scope="col"
                  colSpan={month.span}
                >
                  {month.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {WEEKDAYS.map((weekday, row) => (
              <tr key={weekday}>
                <th scope="row">
                  {row === 1 || row === 3 || row === 5 ? (
                    weekday.slice(0, 3)
                  ) : (
                    <span className="sr-only">{weekday}</span>
                  )}
                </th>
                {weeks.map((week, column) => {
                  const day = week[row];

                  if (!day) {
                    return (
                      <td
                        key={column}
                        aria-hidden="true"
                        className="contribution-empty"
                      />
                    );
                  }

                  return (
                    <td
                      key={day.date}
                      role="gridcell"
                      tabIndex={0}
                      aria-label={`${LONG_DATE.format(toDate(day.date))}: ${countLabel(day.count)}`}
                      data-date={day.date}
                      data-level={day.level}
                      className="contribution-cell"
                      onMouseEnter={(event) =>
                        showTooltip(day, event.currentTarget)
                      }
                      onFocus={(event) => showTooltip(day, event.currentTarget)}
                      onMouseLeave={hideTooltip}
                      onBlur={hideTooltip}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {tooltip ? (
        <div
          aria-hidden="true"
          data-placement={tooltip.below ? "below" : "above"}
          className="contribution-tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      ) : null}
    </>
  );
}
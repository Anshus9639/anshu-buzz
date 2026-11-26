"use client";

import { useEffect, useRef, useState } from "react";
import type { ContributionDay, ContributionWindow } from "@/lib/github-contributions";

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
        Last 30 days
      </p>

      <div
        ref={scrollArea}
        role="region"
        aria-label={`GitHub contribution activity, last 30 days: ${range}`}
        tabIndex={0}
        className="contribution-scroll mt-4 max-w-full overflow-x-auto pb-2"
      >
        <table
          role="grid"
          aria-readonly="true"
          aria-label="GitHub contributions for the last 30 days"
          className="contribution-grid contribution-timeline mx-auto min-w-max"
        >
          <caption className="sr-only">
            {`GitHub contributions from ${range}: ${activity.total} contributions across 30 days`}
          </caption>
          <tbody>
            <tr>
              {activity.days.map((day) => (
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
              ))}
            </tr>
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
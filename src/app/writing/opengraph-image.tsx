import { ogSize, renderOgCard } from "@/lib/og";

export const alt = "Writing — Anshu Saini";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    eyebrow: "Writing",
    title: "Notes on building AI systems and software.",
    subtitle: "Applied AI / Backend / Product engineering",
  });
}

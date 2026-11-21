import { ContributionGraph } from "@/components/contributions/ContributionGraph";
import { profile } from "@/data/profile";
import { getContributionWindow } from "@/lib/github-contributions";

export async function ContributionActivity() {
  const activity = await getContributionWindow();

  return (
    <div className="mt-10">
      <h3 id="contributions-title" className="mono-label text-ash">
        GitHub Activity
      </h3>

      {activity ? (
        <ContributionGraph activity={activity} />
      ) : (
        <p className="mt-2 mono-micro text-ash">
          Activity unavailable.{" "}
          <a
            href={profile.links.github.href}
            target="_blank"
            rel="noreferrer noopener"
            className="link-underline text-chalk transition-colors hover:text-ash"
          >
            View GitHub
          </a>
        </p>
      )}
    </div>
  );
}
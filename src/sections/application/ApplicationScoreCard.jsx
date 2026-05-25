import SidebarCard from "../../components/sidebar/SidebarCard";
import ScoreBadge from "../../components/sidebar/ScoreBadge";
import TeamMemberRow from "../../components/sidebar/TeamMemberRow";

// ─── Static data — replace with API props when ready ─────────────────────────
const STATS = {
  totalApplications: 8,
  countriesApplied: "Aus|Can|UK",
  countriesCount: 2,
};

// Screenshot: ALL avatars are yellow (brandSecondary-500) with dark text
const TEAM_MEMBERS = [
  {
    id: "rv",
    initials: "RV",
    name: "Rahul Verma",
    subtitle: "CA",
    role: "CA",
    color: "bg-brandSecondary-500",
  },
  {
    id: "ag",
    initials: "AG",
    name: "Anjali Gupta",
    subtitle: "BAT",
    role: "BAT",
    color: "bg-brandSecondary-500",
  },
  {
    id: "vs",
    initials: "VS",
    name: "Vikram Singh",
    subtitle: "CAT",
    role: "CAT",
    color: "bg-brandSecondary-500",
  },
];

/**
 * ApplicationScoreCard
 *
 * Props:
 *  score       string | number
 *  stats       object — { totalApplications, countriesApplied, countriesCount }
 *  teamMembers array  — [{ id, initials, name, subtitle, role, color }]
 */
export default function ApplicationScoreCard({
  score = "12%",
  stats = STATS,
  teamMembers = TEAM_MEMBERS,
}) {
  return (
    <SidebarCard>
      <div className="px-4 pt-4 pb-3">

        {/* ── Header ────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[15px] font-semibold text-brandNeutral-800 leading-none">
            Application Score
          </h3>
          <ScoreBadge value={score} />
        </div>

        {/* ── Stats row ─────────────────────────────────────────────── */}
        {/* Each stat lives in its own light-bg rounded box — matches screenshot */}
        <div className="flex items-stretch gap-3 mb-5 pb-5 border-b border-brandNeutral-100">

          {/* Total Applications box */}
          <div className="flex flex-col gap-1.5 bg-brandNeutral-50 rounded-xl px-3 py-2.5 flex-1">
            <span className="text-[10.5px] font-normal text-brandNeutral-400 leading-none">
              Total Applications
            </span>
            <span className="text-[22px] font-bold text-brandNeutral-800 leading-none">
              {stats.totalApplications}
            </span>
          </div>

          {/* Countries Applied box */}
          <div className="flex flex-col gap-1.5 bg-brandNeutral-50 rounded-xl px-3 py-2.5 flex-1">
            <span className="text-[10.5px] font-normal text-brandNeutral-400 leading-none">
              Countries Applied
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] font-semibold text-brandNeutral-700 leading-none">
                {stats.countriesApplied}
              </span>
              {/* +2 green pill — larger, clearly readable, matches screenshot */}
              <span
                className={[
                  "inline-flex items-center justify-center flex-shrink-0",
                  "h-5 min-w-[22px] px-1 rounded-full",
                  "bg-brandPrimary-500 text-white",
                  "text-[10px] font-bold leading-none",
                ].join(" ")}
              >
                +{stats.countriesCount}
              </span>
            </div>
          </div>

        </div>

        {/* ── Assigned Team ──────────────────────────────────────────── */}
        <div>
          <h4 className="text-[13px] font-semibold text-brandNeutral-800 mb-2 leading-none">
            Assigned Team
          </h4>
          <div className="divide-y divide-brandNeutral-100">
            {teamMembers.map((member) => (
              <TeamMemberRow
                key={member.id}
                initials={member.initials}
                name={member.name}
                subtitle={member.subtitle}
                role={member.role}
                color={member.color}
              />
            ))}
          </div>
        </div>

      </div>
    </SidebarCard>
  );
}

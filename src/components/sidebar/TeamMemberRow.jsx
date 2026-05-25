/**
 * TeamMemberRow — single assigned team member row.
 *
 * Pixel-matched to screenshot:
 * - yellow avatar (brandSecondary-500) for all members
 * - name + subtitle stacked left
 * - role tag: white bg + border pill (not plain text)
 * - tighter row padding
 *
 * Props:
 *  initials  string — 2-char initials (e.g. "RV")
 *  name      string — full name
 *  subtitle  string — small label under name (e.g. "CA")
 *  role      string — right-aligned role abbreviation
 *  color     string — Tailwind bg class for avatar
 */
export default function TeamMemberRow({ initials, name, subtitle, role, color }) {
  return (
    <div className="flex items-center gap-2.5 py-2.5">

      {/* Avatar — yellow circle, matches screenshot */}
      <span
        className={[
          "w-[30px] h-[30px] rounded-full flex items-center justify-center flex-shrink-0",
          "text-brandNeutral-800 text-[9.5px] font-bold leading-none tracking-wide",
          color,
        ].join(" ")}
      >
        {initials}
      </span>

      {/* Name + subtitle — grows to fill space */}
      <div className="flex flex-col flex-1 min-w-0 gap-[2px]">
        <span className="text-[12.5px] font-semibold text-brandNeutral-800 leading-snug truncate">
          {name}
        </span>
        <span className="text-[10.5px] font-normal text-brandNeutral-400 leading-none">
          {subtitle}
        </span>
      </div>

      {/* Role badge — bordered pill, white bg, matches screenshot */}
      <span
        className={[
          "flex-shrink-0 px-2.5 py-1 rounded-md",
          "text-[10.5px] font-medium text-brandNeutral-600",
          "bg-white border border-brandNeutral-300",
          "leading-none",
        ].join(" ")}
      >
        {role}
      </span>

    </div>
  );
}

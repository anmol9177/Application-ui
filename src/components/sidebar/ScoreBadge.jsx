
export default function ScoreBadge({ value }) {
  return (
    <span
      className={[
        "inline-flex items-center justify-center flex-shrink-0",
        "w-10 h-10 rounded-full",
        "bg-brandSecondary-500 text-brandNeutral-800",
        "text-[11px] font-bold leading-none",
        "border-2 border: 0.9px solid #A9AFB9",
      ].join(" ")}
    >
      {value}
    </span>
  );
}

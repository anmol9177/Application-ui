/**
 * QuickActionItem — single row in the Quick Actions card.
 * Touch-friendly sizing on mobile, compact on desktop.
 */
export default function QuickActionItem({ label, icon, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        // min-h ensures touch-friendly 44px tap target on mobile
        "w-full flex items-center gap-2.5 px-3 py-2.5 sm:py-2 rounded-xl min-h-[44px] sm:min-h-0",
        "text-left transition-colors duration-150 focus:outline-none",
        "text-[13px] sm:text-[12.5px] font-medium border",
        active
          ? "bg-brandPrimary-50 border-brandPrimary-200 text-brandPrimary-700"
          : "bg-white border-brandNeutral-100 text-brandNeutral-700 hover:bg-brandNeutral-50 hover:border-brandNeutral-200",
      ].join(" ")}
    >
      <span
        className={[
          "flex-shrink-0 flex items-center justify-center",
          active ? "text-brandPrimary-600" : "text-brandPrimary-500",
        ].join(" ")}
      >
        {icon}
      </span>
      {label}
    </button>
  );
}
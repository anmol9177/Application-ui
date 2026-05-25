/**
 * QuickActionItem — single row in the Quick Actions card.
 *
 * Pixel-matched to screenshot:
 * - each row is a light gray-bordered rounded rectangle
 * - active = very soft teal surface bg + teal text/icon (NOT a filled button)
 * - inactive = white bg, teal icon, dark text
 * - compact row height ~36px
 *
 * Props:
 *  label    string  — action label
 *  icon     node    — Lucide icon element
 *  active   bool    — soft teal highlight
 *  onClick  fn
 */
export default function QuickActionItem({ label, icon, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl",
        "text-left transition-colors duration-150 focus:outline-none",
        "text-[12.5px] font-medium border",
        active
          ? "bg-brandPrimary-50 border-brandPrimary-200 text-brandPrimary-700"
          : "bg-white border-brandNeutral-100 text-brandNeutral-700 hover:bg-brandNeutral-50 hover:border-brandNeutral-200",
      ].join(" ")}
    >
      {/* Icon — teal on both active and inactive */}
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

/**
 * SubTabs — pill-shaped secondary tab selector
 * Responsive: wraps naturally, scrolls on very narrow screens.
 *
 * Props:
 *  tabs      array   — [{ id, label }]
 *  activeTab string  — currently active tab id
 *  onChange  fn      — (tabId: string) => void
 *  className string  — extra wrapper classes
 */
export default function SubTabs({ tabs = [], activeTab, onChange, className = "" }) {
  return (
    // min-w-max ensures pills don't get squeezed; parent has overflow-x-auto
    <div className={`flex items-center gap-1.5 sm:gap-2 min-w-max ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange && onChange(tab.id)}
            className={[
              "h-7 sm:h-8 px-3 sm:px-4 rounded-full",
              "text-[11.5px] sm:text-[12.5px] font-medium transition-all duration-150",
              "focus:outline-none focus:ring-2 focus:ring-brandSecondary-400/50 whitespace-nowrap",
              isActive
                ? "bg-brandSecondary-500 text-brandNeutral-800 shadow-sm"
                : "bg-transparent text-brandNeutral-500 hover:bg-brandNeutral-100 border border-transparent hover:border-brandNeutral-200",
            ].join(" ")}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
/**
 * TopNavTabs — primary horizontal tab bar
 * Responsive: scrollable on mobile, normal on desktop.
 *
 * Props:
 *  tabs      array   — [{ id, label }]
 *  activeTab string  — currently active tab id
 *  onChange  fn      — (tabId: string) => void
 */
export default function TopNavTabs({ tabs = [], activeTab, onChange }) {
  return (
    // overflow-x-auto allows tabs to scroll horizontally on narrow screens
    // without breaking layout. scrollbar-hide keeps it clean visually.
    <div className="overflow-x-auto border-b border-brandNeutral-200 bg-white rounded-t-2xl">
      <div className="flex items-end gap-0 px-3 sm:px-6 min-w-max">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange && onChange(tab.id)}
              className={[
                "relative pb-3 pt-3 sm:pt-4 px-3 sm:px-4",
                "text-[13px] sm:text-[13.5px] font-medium transition-colors duration-150",
                "focus:outline-none whitespace-nowrap",
                isActive
                  ? "text-brandNeutral-800"
                  : "text-brandNeutral-400 hover:text-brandNeutral-600",
              ].join(" ")}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brandSecondary-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
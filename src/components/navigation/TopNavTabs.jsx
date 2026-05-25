/**
 * TopNavTabs — primary horizontal tab bar
 *
 * Props:
 *  tabs      array   — [{ id, label }]
 *  activeTab string  — currently active tab id
 *  onChange  fn      — (tabId: string) => void
 */
export default function TopNavTabs({ tabs = [], activeTab, onChange }) {
  return (
    <div className="flex items-end gap-0 border-b border-brandNeutral-200 px-6 bg-white rounded-t-2xl">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange && onChange(tab.id)}
            className={[
              "relative pb-3 pt-4 px-4 text-[13.5px] font-medium transition-colors duration-150",
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
  );
}

/**
 * SubTabs — pill-shaped secondary tab selector
 *
 * Props:
 *  tabs      array   — [{ id, label }]
 *  activeTab string  — currently active tab id
 *  onChange  fn      — (tabId: string) => void
 *  className string  — extra wrapper classes
 */
export default function SubTabs({ tabs = [], activeTab, onChange, className = "" }) {
  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange && onChange(tab.id)}
            className={[
              "h-8 px-4 rounded-full text-[12.5px] font-medium transition-all duration-150",
              "focus:outline-none focus:ring-2 focus:ring-yellow-300/50 whitespace-nowrap",
              isActive
                ? "bg-yellow-300 text-gray-800 shadow-sm"
                : "bg-transparent text-gray-500 hover:bg-gray-100 border border-transparent hover:border-gray-200",
            ].join(" ")}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

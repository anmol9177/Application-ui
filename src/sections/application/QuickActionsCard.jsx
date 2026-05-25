import { useState } from "react";
import {
  Plane,
  BookOpen,
  Receipt,
  ClipboardList,
  ClipboardCheck,
} from "lucide-react";
import SidebarCard from "../../components/sidebar/SidebarCard";
import QuickActionItem from "../../components/sidebar/QuickActionItem";

// ─── Action definitions ───────────────────────────────────────────────────────
// Icons chosen to closely match screenshot silhouettes:
//  Visa             → Plane (travel document)
//  Special Service  → BookOpen (open book/document)
//  Application Fees → Receipt
//  Start BAT Valid  → ClipboardList
//  Start CAT Valid  → ClipboardCheck
const ACTIONS = [
  {
    id: "visa",
    label: "Visa",
    icon: <Plane size={14} strokeWidth={1.6} />,
  },
  {
    id: "specialServiceUnit",
    label: "Special Service Unit",
    icon: <BookOpen size={14} strokeWidth={1.6} />,
  },
  {
    id: "applicationFees",
    label: "Application Fees",
    icon: <Receipt size={14} strokeWidth={1.6} />,
  },
  {
    id: "startBatValidation",
    label: "Start BAT Validation",
    icon: <ClipboardList size={14} strokeWidth={1.6} />,
  },
  {
    id: "startCatValidation",
    label: "Start CAT Validation",
    icon: <ClipboardCheck size={14} strokeWidth={1.6} />,
  },
];

/**
 * QuickActionsCard
 *
 * Props:
 *  defaultActive string — id of action that starts highlighted
 *  onAction      fn     — (actionId: string) => void
 */
export default function QuickActionsCard({
  defaultActive = "specialServiceUnit",
  onAction,
}) {
  const [activeId, setActiveId] = useState(defaultActive);

  const handleClick = (id) => {
    setActiveId(id);
    onAction && onAction(id);
  };

  return (
    <SidebarCard>
      <div className="px-4 pt-4 pb-3">

        {/* Header */}
        <h3 className="text-[14px] font-semibold text-brandNeutral-800 leading-none mb-3">
          Quick Actions
        </h3>

        {/* Action list — tight gap matching screenshot */}
        <div className="flex flex-col gap-1.5">
          {ACTIONS.map((action) => (
            <QuickActionItem
              key={action.id}
              label={action.label}
              icon={action.icon}
              active={activeId === action.id}
              onClick={() => handleClick(action.id)}
            />
          ))}
        </div>

      </div>
    </SidebarCard>
  );
}

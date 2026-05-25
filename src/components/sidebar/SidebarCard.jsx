/**
 * SidebarCard — white rounded card used in the right sidebar.
 *
 * Props:
 *  className string — extra wrapper classes
 *  children  node
 */
export default function SidebarCard({ className = "", children }) {
  return (
    <div
      className={[
        "bg-white rounded-2xl border border-brandNeutral-200",
        "shadow-[0_2px_12px_0_rgba(0,0,0,0.06)]",
        "overflow-hidden",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

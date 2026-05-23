/**
 * ContentCard — white rounded card container
 *
 * Props:
 *  className string — extra classes
 *  children  node   — card content
 *  noPadding bool   — removes default padding (for custom layouts)
 */
export default function ContentCard({ className = "", noPadding = false, children }) {
  return (
    <div
      className={[
        "bg-white rounded-2xl border border-gray-200 shadow-sm",
        noPadding ? "" : "p-6",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

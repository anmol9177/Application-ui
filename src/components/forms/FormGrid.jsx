/**
 * FormGrid — responsive form field grid
 *
 * Breakpoint strategy (mobile-first):
 *  mobile  → 1 column
 *  sm(640) → 1 column  (still single on small tablet)
 *  md(768) → 2 columns
 *  lg(1024)→ 3 columns (default)
 *
 * Props:
 *  columns   1 | 2 | 3  — override column count (default: 3)
 *  className string
 *  children  node
 */
const colMap = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
};

export default function FormGrid({ columns = 3, className = "", children }) {
  return (
    <div
      className={[
        "grid gap-x-4 gap-y-4 sm:gap-x-5 sm:gap-y-5",
        colMap[columns] || colMap[3],
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
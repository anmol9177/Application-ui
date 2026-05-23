/**
 * FormGrid — responsive 3-column form field grid
 *
 * Props:
 *  columns   1 | 2 | 3   — override column count (default: 3)
 *  className string       — extra classes
 *  children  node         — form fields
 *
 * Usage:
 *  <FormGrid>
 *    <InputField ... />
 *    <SelectField ... />
 *    <InputField ... />
 *  </FormGrid>
 *
 * For a field that should span all columns:
 *  <div className="col-span-full">...</div>
 *  or
 *  <div className="md:col-span-2">...</div>
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
        "grid gap-x-5 gap-y-5",
        colMap[columns] || colMap[3],
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

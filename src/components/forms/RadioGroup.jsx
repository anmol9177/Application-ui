/**
 * RadioGroup — single-axis radio button group
 *
 * Props:
 *  label    string   — group label
 *  name     string   — radio group name
 *  value    string   — currently selected value
 *  onChange fn       — (value: string) => void
 *  options  array    — [{ label, value }]
 *  className string  — extra wrapper classes
 */
export default function RadioGroup({
  label,
  name,
  value,
  onChange,
  options = [],
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <span className="text-[13px] font-medium text-gray-600 leading-none">
          {label}
        </span>
      )}

      <div className="flex items-center gap-6 h-10.5">
        {options.map((opt) => {
          const checked = value === opt.value;
          return (
            <label
              key={opt.value}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              {/* Custom radio ring */}
              <span
                onClick={() => onChange && onChange(opt.value)}
                className={[
                  "w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-150",
                  checked
                    ? "border-green-500"
                    : "border-gray-300 hover:border-gray-400",
                ].join(" ")}
              >
                {checked && (
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 block" />
                )}
              </span>
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={checked}
                onChange={() => onChange && onChange(opt.value)}
                className="sr-only"
              />
              <span className="text-[13.5px] text-gray-700">{opt.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

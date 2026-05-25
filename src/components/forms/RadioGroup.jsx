/**
 * RadioGroup — single-axis radio button group
 *
 * Pixel-matched to screenshot:
 *  checked   — fully filled brandPrimary-500 circle + white center dot
 *  unchecked — white fill, 1.5px brandNeutral-300 border, no inner dot
 *
 * Props:
 *  label     string  — group label
 *  name      string  — radio group name
 *  value     string  — currently selected value
 *  onChange  fn      — (value: string) => void
 *  options   array   — [{ label, value }]
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
        <span className="text-[13px] font-medium text-brandNeutral-600 leading-none">
          {label}
        </span>
      )}

      <div className="flex items-center gap-6 h-[42px]">
        {options.map((opt) => {
          const checked = value === opt.value;
          return (
            <label
              key={opt.value}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              {/* Custom radio — fully filled when checked */}
              <span
                className={[
                  "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-150",
                  checked
                    ? "bg-brandPrimary-500 border-2 border-brandPrimary-500"
                    : "bg-white border-[1.5px] border-brandNeutral-300 hover:border-brandNeutral-400",
                ].join(" ")}
              >
                {checked && (
                  <span className="w-[7px] h-[7px] rounded-full bg-white block" />
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

              <span className="text-[13.5px] text-brandNeutral-700">{opt.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

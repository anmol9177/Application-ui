import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

/**
 * SelectField — production-grade select dropdown
 *
 * Props:
 *  label        string        — field label
 *  id           string        — links label to select
 *  name         string        — select name attr
 *  value        string        — controlled value
 *  onChange     fn            — change handler
 *  options      array         — [{ label, value }]
 *  placeholder  string        — first disabled option text
 *  disabled     bool          — disables the select
 *  className    string        — extra wrapper classes
 *  error        string        — validation error message
 */
const SelectField = forwardRef(function SelectField(
  {
    label,
    id,
    name,
    value = "",
    onChange,
    options = [],
    placeholder = "Select",
    disabled = false,
    className = "",
    error,
    ...rest
  },
  ref
) {
  const fieldId = id || name;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={fieldId}
          className="text-[13px] font-medium text-gray-600 leading-none"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={fieldId}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={[
            "w-full h-[42px] pl-3 pr-9 rounded-lg border text-[13.5px] appearance-none transition-colors duration-150",
            disabled
              ? "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed pointer-events-none"
              : "bg-gray-50 border-gray-200 cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400",
            value === "" ? "text-gray-400" : "",
            disabled && value !== "" ? "text-gray-500" : "",
            error ? "border-red-400 focus:ring-red-200 focus:border-red-400" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 pointer-events-none">
          <ChevronDown size={15} strokeWidth={2} />
        </span>
      </div>

      {error && (
        <p className="text-[11.5px] text-red-500 mt-0.5">{error}</p>
      )}
    </div>
  );
});

export default SelectField;

import { forwardRef } from "react";

/**
 * InputField — production-grade text input
 * Fully responsive: full-width on all screens, icons properly positioned.
 */
const InputField = forwardRef(function InputField(
  {
    label,
    id,
    name,
    value = "",
    onChange,
    placeholder = "",
    disabled = false,
    type = "text",
    rightIcon,
    className = "",
    inputClass = "",
    error,
    ...rest
  },
  ref
) {
  const fieldId = id || name;

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label
          htmlFor={fieldId}
          className="text-[13px] font-medium text-brandNeutral-600 leading-none"
        >
          {label}
        </label>
      )}

      <div className="relative w-full">
        <input
          ref={ref}
          id={fieldId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={[
            // Full width, consistent height, responsive padding
            "w-full h-[42px] px-3 rounded-lg border text-[13.5px] transition-colors duration-150",
            // Date inputs: prevent browser chrome from overflowing
            type === "date" ? "min-w-0" : "",
            disabled
              ? "bg-brandNeutral-50 border-brandNeutral-200 text-brandNeutral-500 cursor-not-allowed select-none pointer-events-none"
              : "bg-brandNeutral-50 border-brandNeutral-200 text-brandNeutral-700 hover:border-brandNeutral-300 focus:outline-none focus:ring-2 focus:ring-brandSecondary-400/40 focus:border-brandSecondary-400",
            "placeholder-brandNeutral-400",
            rightIcon ? "pr-10" : "",
            error ? "border-red-400 focus:ring-red-200 focus:border-red-400" : "",
            inputClass,
          ]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        />
        {rightIcon && (
          <span className="absolute inset-y-0 right-3 flex items-center text-brandNeutral-400 pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>

      {error && (
        <p className="text-[11.5px] text-red-500 mt-0.5">{error}</p>
      )}
    </div>
  );
});

export default InputField;
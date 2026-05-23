/**
 * Button — production-grade button
 *
 * Variants matched pixel-perfect to screenshots:
 *  primary  — dark teal/green (#1a7a6e area) background, white text  [Save Details]
 *  outline  — white bg, gray border, dark text                        [Send Acknowledgement]
 *  ghost    — transparent bg, gray text
 *
 * Props:
 *  variant   "primary" | "outline" | "ghost"
 *  size      "sm" | "md" | "lg"
 *  leftIcon  node
 *  rightIcon node
 *  disabled  bool
 *  loading   bool
 *  onClick   fn
 *  type      string
 *  className string
 *  children  node
 */
export default function Button({
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  className = "",
  children,
}) {
  const base = [
    "inline-flex items-center justify-center gap-2 font-medium rounded-xl",
    "transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1",
    "select-none whitespace-nowrap",
  ].join(" ");

  const sizes = {
    sm: "h-8 px-4 text-[12.5px]",
    md: "h-[42px] px-5 text-[13.5px]",
    lg: "h-[46px] px-7 text-[14px]",
  };

  const variants = {
    // Matches screenshot: dark teal-green "Save Details" button
    primary: [
      "bg-[#1e6b5e] text-white border border-[#1e6b5e]",
      "hover:bg-[#175a4f] hover:border-[#175a4f] focus:ring-[#1e6b5e]/40",
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ].join(" "),

    // Matches screenshot: white "Send Acknowledgement" button with visible border
    outline: [
      "bg-white text-gray-700 border border-gray-300",
      "hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-300/50",
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ].join(" "),

    ghost: [
      "bg-transparent text-gray-600 border border-transparent",
      "hover:bg-gray-100 focus:ring-gray-300/50",
      "disabled:opacity-40 disabled:cursor-not-allowed",
    ].join(" "),
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={[base, sizes[size], variants[variant], className].join(" ")}
    >
      {loading ? (
        <svg
          className="animate-spin w-4 h-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      ) : leftIcon ? (
        <span className="flex-shrink-0">{leftIcon}</span>
      ) : null}

      {children}

      {!loading && rightIcon && (
        <span className="flex-shrink-0">{rightIcon}</span>
      )}
    </button>
  );
}

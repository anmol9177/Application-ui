/**
 * Button — production-grade button
 *
 * Variants pixel-matched to screenshot and migrated to design tokens:
 *  primary  — brandPrimary-500 teal bg, white text   → "Save Details"
 *  outline  — white bg, brandNeutral-300 border       → "Send Acknowledgement"
 *  ghost    — transparent bg, muted text
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
    sm:  "h-8 px-4 text-[12.5px]",
    md:  "h-[42px] px-5 text-[13.5px]",
    lg:  "h-[46px] px-7 text-[14px]",
  };

  const variants = {
    primary: [
      "bg-brandPrimary-500 text-white border border-brandPrimary-500",
      "hover:bg-brandPrimary-600 hover:border-brandPrimary-600",
      "focus:ring-brandPrimary-500/40",
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ].join(" "),

    outline: [
      "bg-white text-brandNeutral-700 border border-brandNeutral-300",
      "hover:bg-brandNeutral-50 hover:border-brandNeutral-400",
      "focus:ring-brandNeutral-300/50",
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ].join(" "),

    ghost: [
      "bg-transparent text-brandNeutral-600 border border-transparent",
      "hover:bg-brandNeutral-100",
      "focus:ring-brandNeutral-300/50",
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

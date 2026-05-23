// ─── Top-level navigation tabs ───────────────────────────────────────────────
export const TOP_NAV_TABS = [
  { id: "application", label: "Application" },
  { id: "applicant", label: "Applicant" },
  { id: "coursePreferences", label: "Course Preferences" },
];

// ─── Application sub-tabs ─────────────────────────────────────────────────────
export const APPLICATION_SUB_TABS = [
  { id: "applicationDetails", label: "Application Details" },
  { id: "courseDetails", label: "Course Details" },
  { id: "applicationModeInfo", label: "Application Mode Information" },
];

// ─── Select field options ─────────────────────────────────────────────────────
export const APPLICATION_STATUS_OPTIONS = [
  { value: "underReview", label: "Under Review" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "pending", label: "Pending" },
  { value: "conditionalOffer", label: "Conditional Offer" },
  { value: "unconditionalOffer", label: "Unconditional Offer" },
];

export const APPLICATION_TYPE_OPTIONS = [
  { value: "conditionalOffer", label: "Application for conditional offer" },
  { value: "unconditionalOffer", label: "Application for unconditional offer" },
  { value: "directEntry", label: "Direct Entry" },
];

export const APPLICATION_MODE_OPTIONS = [
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
  { value: "hybrid", label: "Hybrid" },
];

export const PORTAL_OPTIONS = [
  { value: "ucas", label: "UCAS" },
  { value: "direct", label: "Direct" },
  { value: "agent", label: "Agent Portal" },
];

export const ACKNOWLEDGEMENT_STATUS_OPTIONS = [
  { value: "sent", label: "Sent" },
  { value: "pending", label: "Pending" },
  { value: "notRequired", label: "Not Required" },
];

export const YES_NO_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export const COURSE_LEVEL_OPTIONS = [
  { value: "masters", label: "Masters" },
  { value: "bachelors", label: "Bachelors" },
  { value: "phd", label: "PhD" },
  { value: "diploma", label: "Diploma" },
];

export const INTAKE_OPTIONS = [
  { value: "sep2026", label: "September 2026" },
  { value: "jan2027", label: "January 2027" },
  { value: "sep2027", label: "September 2027" },
];

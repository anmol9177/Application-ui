// ─── Country codes for Primary Mobile field ───────────────────────────────────
export const COUNTRY_CODE_OPTIONS = [
  { value: "+91", label: "+91 (India)" },
  { value: "+61", label: "+61 (Australia)" },
  { value: "+1", label: "+1 (Canada)" },
  { value: "+44", label: "+44 (UK)" },
  { value: "+1-us", label: "+1 (USA)" },
];

// ─── Status options ───────────────────────────────────────────────────────────
export const APPLICANT_STATUS_OPTIONS = [
  { value: "offShore", label: "Off Shore" },
  { value: "onShore", label: "On Shore" },
];

// ─── Lead Branch options ──────────────────────────────────────────────────────
export const LEAD_BRANCH_OPTIONS = [
  { value: "prodigyConsultancy", label: "Prodigy Consultancy Service" },
  { value: "globalEdge", label: "Global Edge Services" },
  { value: "studyAbroad", label: "Study Abroad Consultants" },
];

// ─── Nearest Branch options ───────────────────────────────────────────────────
export const NEAREST_BRANCH_OPTIONS = [
  { value: "gurgaon", label: "Gurgaon" },
  { value: "delhi", label: "Delhi" },
  { value: "mumbai", label: "Mumbai" },
  { value: "bangalore", label: "Bangalore" },
  { value: "hyderabad", label: "Hyderabad" },
];

// ─── Intake Month options ─────────────────────────────────────────────────────
export const INTAKE_MONTH_OPTIONS = [
  { value: "january", label: "January" },
  { value: "february", label: "February" },
  { value: "march", label: "March" },
  { value: "april", label: "April" },
  { value: "may", label: "May" },
  { value: "june", label: "June" },
  { value: "july", label: "July" },
  { value: "august", label: "August" },
  { value: "september", label: "September" },
  { value: "october", label: "October" },
  { value: "november", label: "November" },
  { value: "december", label: "December" },
];

// ─── Intake Year options ──────────────────────────────────────────────────────
export const INTAKE_YEAR_OPTIONS = [
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
  { value: "2027", label: "2027" },
  { value: "2028", label: "2028" },
];

// ─── Agent Authorization options ──────────────────────────────────────────────
export const AGENT_AUTH_OPTIONS = [
  { value: "agent1", label: "Agent Authorization 1" },
  { value: "agent2", label: "Agent Authorization 2" },
  { value: "change", label: "Change Authorization" },
];

// ─── Application Stage options ────────────────────────────────────────────────
export const APPLICATION_STAGE_OPTIONS = [
  { value: "centralValidation", label: "Application Validation by Central Team" },
  { value: "underReview", label: "Under Review" },
  { value: "submitted", label: "Submitted" },
  { value: "approved", label: "Approved" },
];

// ─── Leading Degree options ───────────────────────────────────────────────────
export const LEADING_DEGREE_OPTIONS = [
  { value: "bachelor", label: "Bachelor's Degree" },
  { value: "master", label: "Master's Degree" },
  { value: "diploma", label: "Diploma" },
  { value: "phd", label: "PhD" },
];

// ─── Course Preferences — Campus options ──────────────────────────────────────
export const CAMPUS_OPTIONS = [
  { value: "warwickCampus", label: "Warwick Campus" },
  { value: "melbourneCampus", label: "Melbourne Campus" },
  { value: "sydneyCampus", label: "Sydney Campus" },
  { value: "londonCampus", label: "London Campus" },
];

// ─── Course Preferences — Course options ──────────────────────────────────────
export const COURSE_OPTIONS = [
  { value: "mscBusinessMarketing", label: "MSC In Business with Marketing" },
  { value: "mscFinance", label: "MSC In Finance" },
  { value: "mbaGeneral", label: "MBA General" },
  { value: "mscDataScience", label: "MSC In Data Science" },
  { value: "bachelorArts", label: "Bachelor of Arts" },
];
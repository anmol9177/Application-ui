// ─── Top-level offer page tabs ────────────────────────────────────────────────
export const OFFER_TOP_TABS = [
  { id: "offer", label: "Offer" },
  { id: "offerAcceptance", label: "Offer Acceptance" },
];

// ─── Offer Status options ─────────────────────────────────────────────────────
export const OFFER_STATUS_OPTIONS = [
  { value: "conditionalOfferReceived", label: "Conditional Offer Received" },
  { value: "unconditionalOfferReceived", label: "Unconditional Offer Received" },
  { value: "offerDeclined", label: "Offer Declined" },
  { value: "offerAccepted", label: "Offer Accepted" },
];

// ─── Offer Preference options ─────────────────────────────────────────────────
export const OFFER_PREFERENCE_OPTIONS = [
  {
    value: "parkvilleMasterPharma",
    label: "Parkville Campus/Master of Pharma...",
  },
  { value: "melbourneMasterBusiness", label: "Melbourne Campus/Master of Business" },
  { value: "sydneyBachelorArts", label: "Sydney Campus/Bachelor of Arts" },
];

// ─── Scholarship Given On options ─────────────────────────────────────────────
export const SCHOLARSHIP_GIVEN_ON_OPTIONS = [
  { value: "totalTuitionFees", label: "Total Tuition Fees" },
  { value: "annualTuitionFees", label: "Annual Tuition Fees" },
];

// ─── Conditions for conditional offer (multi-select display) ─────────────────
export const CONDITIONS_OPTIONS = [
  { value: "englishProficiency", label: "English Proficiency" },
  { value: "academicTranscripts", label: "Academic Transcripts" },
  { value: "referenceLetter", label: "Reference Letter" },
  { value: "statementOfPurpose", label: "Statement of Purpose" },
  { value: "medicalClearance", label: "Medical Clearance" },
];

// ─── AUD → INR conversion rate (placeholder; replace via API) ─────────────────
export const AUD_TO_INR_RATE = 55.0;

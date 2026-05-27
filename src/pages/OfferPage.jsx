import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

import Button from "../components/common/Button";

import OfferSection from "../sections/offer/OfferSection";
import OfferAcceptanceSection from "../sections/offer/OfferAcceptanceSection";

import ApplicationScoreCard from "../sections/application/ApplicationScoreCard";
import QuickActionsCard from "../sections/application/QuickActionsCard";

import {
  OFFER_TOP_TABS,
  AUD_TO_INR_RATE,
} from "../constants/offerConstants";

// ─── Initial form state ───────────────────────────────────────────────────────
// Fields marked "from API" will be replaced by a service call in src/services/.
// Fields marked "calculated" are derived by deriveCalculatedFields().
const INITIAL_STATE = {
  // Editable — user input
  studentId: "",
  offerStatus: "conditionalOfferReceived",
  offerPreferenceFor: "parkvilleMasterPharma",
  autoCalculationFees: "yes",
  courseStartDate: "2026-05-08",
  estimatedCourseCompletionDate: "2026-05-18",
  conditionalOfferDate: "2026-08-08",
  conditionalOfferLapseDate: "2026-08-28",
  specifyConditions: "englishProficiency", // TODO: replace with multi-select array
  scholarshipProvided: "yes",
  scholarshipGivenOn: "totalTuitionFees",
  scholarshipType: "percentage",
  scholarshipAmountAUD: "800.00",
  annualFeesAfterScholarshipAUD: "",
  totalFeesAfterScholarshipAUD: "",
  oshcFees: "1878.00",

  // Disabled — populated from API
  annualTuitionFeesAUD: "58800.00",
  annualTuitionFeesINR: "382118.00",
  totalTuitionFeesAUD: "117000",
  totalTuitionFeesINR: "562118.00",

  // Disabled — auto-calculated, never edited directly
  annualFeesAfterScholarshipINR: "",
  totalFeesAfterScholarshipINR: "",
  totalAnnualFeesAUD: "",
  totalAnnualFeesINR: "",
};

// ─── Document state model ─────────────────────────────────────────────────────
// TODO: Replace with real document URL from API response on page load.
const INITIAL_DOCUMENT = {
  name: "ConditionalOffer.pdf",
  // Placeholder: points to a public sample PDF.
  // Replace with a real signed URL from the backend when integrating.
  url: "https://www.w3.org/WAI/WCAG21/Techniques/pdf/sample.pdf",
};

// ─── Auto-calculation helpers ─────────────────────────────────────────────────
/** Safely parse a numeric string — returns 0 on failure */
function parseNum(val) {
  const n = parseFloat(String(val).replace(/,/g, ""));
  return isNaN(n) ? 0 : n;
}

/** Format number to 2dp string; returns empty string when value is 0 */
function fmt(n) {
  return n > 0 ? n.toFixed(2) : "";
}

/**
 * Derives all auto-calculated fields from current formData.
 * Only runs when autoCalculationFees === "yes".
 *
 * Formulas:
 *   annualFeesAfterScholarshipINR = annualFeesAfterScholarshipAUD × AUD_TO_INR_RATE
 *   totalFeesAfterScholarshipINR  = totalFeesAfterScholarshipAUD  × AUD_TO_INR_RATE
 *   totalAnnualFeesAUD            = totalFeesAfterScholarshipAUD  + oshcFees
 *   totalAnnualFeesINR            = totalAnnualFeesAUD            × AUD_TO_INR_RATE
 */
function deriveCalculatedFields(data) {
  if (data.autoCalculationFees !== "yes") return {};

  const annualAfterAUD = parseNum(data.annualFeesAfterScholarshipAUD);
  const totalAfterAUD  = parseNum(data.totalFeesAfterScholarshipAUD);
  const oshc           = parseNum(data.oshcFees);
  const totalAnnualAUD = totalAfterAUD + oshc;

  return {
    annualFeesAfterScholarshipINR: fmt(annualAfterAUD * AUD_TO_INR_RATE),
    totalFeesAfterScholarshipINR:  fmt(totalAfterAUD  * AUD_TO_INR_RATE),
    totalAnnualFeesAUD:            fmt(totalAnnualAUD),
    totalAnnualFeesINR:            fmt(totalAnnualAUD * AUD_TO_INR_RATE),
  };
}

// ─── Page component ───────────────────────────────────────────────────────────

export default function OfferPage() {
  const [activeTopTab, setActiveTopTab] = useState("offer");
  const [formData, setFormData]         = useState(INITIAL_STATE);

  // Document state: null means no document attached.
  // TODO: Fetch from API on mount and set here.
  const [documentFile, setDocumentFile] = useState(INITIAL_DOCUMENT);

  // ── Recalculate derived fields whenever source inputs change ───────────────
  useEffect(() => {
    if (formData.autoCalculationFees !== "yes") return;
    const derived = deriveCalculatedFields(formData);
    setFormData((prev) => ({ ...prev, ...derived }));
    // Only the four source fields should trigger recalc — not the derived ones.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formData.autoCalculationFees,
    formData.annualFeesAfterScholarshipAUD,
    formData.totalFeesAfterScholarshipAUD,
    formData.oshcFees,
  ]);

  // ── Field change handler ───────────────────────────────────────────────────
  const handleFieldChange = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };

      // Clear scholarship-specific fields when scholarship is turned off
      if (field === "scholarshipProvided" && value === "no") {
        next.scholarshipAmountAUD          = "";
        next.annualFeesAfterScholarshipAUD = "";
        next.totalFeesAfterScholarshipAUD  = "";
        next.annualFeesAfterScholarshipINR = "";
        next.totalFeesAfterScholarshipINR  = "";
      }

      return next;
    });
  };

  // ── Document handlers ──────────────────────────────────────────────────────

  /**
   * Opens the document in a new browser tab.
   * TODO: If the URL is a signed S3/Azure link, ensure it hasn't expired
   *       before calling this — refresh via API if needed.
   */
  const handleDocView = () => {
    if (!documentFile?.url) return;
    window.open(documentFile.url, "_blank", "noopener,noreferrer");
  };

  /**
   * Triggers a browser file download for the conditional offer document.
   * TODO: Replace documentFile.url with a real download endpoint from the API.
   *       If the backend returns a blob, use URL.createObjectURL() instead.
   */
  const handleDocDownload = () => {
    if (!documentFile?.url) return;
    const link = document.createElement("a");
    link.href = documentFile.url;
    link.download = documentFile.name ?? "ConditionalOffer.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * Removes the document from UI state immediately.
   * TODO: Call DELETE /api/offer-documents/:id before setting state,
   *       and only clear on successful API response.
   */
  const handleDocDelete = () => {
    setDocumentFile(null);
  };

  // ── Footer action handlers ─────────────────────────────────────────────────

  /**
   * Persists offer form data.
   * TODO: Call POST/PUT /api/offers with formData payload.
   */
  const handleSave = () => {
    // TODO: await offerService.save(formData)
  };

  /**
   * Triggers sending the conditional offer letter to the student.
   * TODO: Call POST /api/offers/:id/send-letter.
   */
  const handleSendLetter = () => {
    // TODO: await offerService.sendLetter(formData.studentId)
  };

  return (
    <div className="min-h-screen px-3 py-4 bg-brandNeutral-100 sm:py-6 sm:px-4 lg:py-8">

      {/* ── Outer row: main card + sidebar ──────────────────────────────── */}
      <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row lg:items-start gap-4">

        {/* ── LEFT: Main offer card ──────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-brandNeutral-200">

            {/* ── Top nav bar ─────────────────────────────────────────────
                Structure: tabs (left, scrollable) + Special Services (right, sticky).
                The outer div clips overflow; the inner scrollable div contains only
                the tabs so the Special Services button stays pinned to the right
                at all viewport widths without being pushed off-screen.            */}
            <div className="flex items-stretch bg-white border-b border-brandNeutral-200 rounded-t-2xl">

              {/* Tab group — scrolls horizontally on narrow screens */}
              <div className="flex-1 overflow-x-auto">
                <div className="flex items-end h-full px-3 sm:px-6 min-w-max">
                  {OFFER_TOP_TABS.map((tab) => {
                    const isActive = tab.id === activeTopTab;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTopTab(tab.id)}
                        className={[
                          "relative pb-3 pt-3 sm:pt-4 px-3 sm:px-4",
                          "text-[13px] sm:text-[13.5px] font-medium",
                          "transition-colors duration-150 focus:outline-none whitespace-nowrap",
                          isActive
                            ? "text-brandNeutral-800"
                            : "text-brandNeutral-400 hover:text-brandNeutral-600",
                        ].join(" ")}
                      >
                        {tab.label}
                        {isActive && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brandSecondary-500 rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Services — stays pinned right, never scrolls away */}
              <div className="flex items-center flex-shrink-0 pl-3 pr-3 sm:pr-6">
                <button
                  type="button"
                  className={[
                    "h-[30px] px-3.5 rounded-lg",
                    "border border-brandNeutral-300 bg-white",
                    "text-[12px] font-medium text-brandNeutral-600",
                    "hover:bg-brandNeutral-50 hover:border-brandNeutral-400",
                    "transition-colors duration-150 focus:outline-none",
                    "whitespace-nowrap",
                  ].join(" ")}
                >
                  Special Services
                </button>
              </div>

            </div>

            {/* ── Form body ───────────────────────────────────────────────── */}
            <div className="px-3 pt-4 pb-3 sm:px-5 sm:pt-5 sm:pb-4 lg:px-6 lg:pt-6 lg:pb-4">
              {activeTopTab === "offer" && (
                <OfferSection
                  data={formData}
                  onChange={handleFieldChange}
                  documentFile={documentFile}
                  onDocDownload={handleDocDownload}
                  onDocView={handleDocView}
                  onDocDelete={handleDocDelete}
                />
              )}
              {activeTopTab === "offerAcceptance" && (
                <OfferAcceptanceSection
                  data={formData}
                  onChange={handleFieldChange}
                />
              )}
            </div>

            {/* ── Footer ──────────────────────────────────────────────────── */}
            <div className="flex flex-col-reverse items-stretch justify-end gap-2 px-3 py-3 border-t border-brandNeutral-100 sm:px-6 sm:py-4 sm:flex-row sm:items-center sm:gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={handleSendLetter}
                className="justify-center w-full sm:w-auto"
              >
                Send Conditional Offer Letter to Student
              </Button>
              <Button
                variant="primary"
                size="md"
                leftIcon={<CheckCircle size={15} strokeWidth={2.2} />}
                onClick={handleSave}
                className="justify-center w-full sm:w-auto"
              >
                Save Details
              </Button>
            </div>

          </div>
        </div>

        {/* ── RIGHT: Sidebar — reuses existing cards unchanged ────────────── */}
        <aside className="w-full lg:w-[280px] lg:flex-shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
          <div className="flex-1 lg:flex-none">
            <ApplicationScoreCard />
          </div>
          <div className="flex-1 lg:flex-none">
            <QuickActionsCard />
          </div>
        </aside>

      </div>
    </div>
  );
}
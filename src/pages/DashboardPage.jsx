import { useState } from "react";
import TopNavTabs from "../components/navigation/TopNavTabs";

import ApplicationScoreCard from "../sections/application/ApplicationScoreCard";
import QuickActionsCard from "../sections/application/QuickActionsCard";

import ApplicationModule from "../modules/application/ApplicationModule";
import ApplicantModule from "../modules/applicant/ApplicantModule";
import CoursePreferencesModule from "../modules/coursePreferences/CoursePreferencesModule";

import {
  TOP_NAV_TABS,
  APPLICATION_SUB_TABS,
} from "../constants/applicationConstants";

// ─── Application module initial state (read-only fields from API) ─────────────
const INITIAL_APPLICATION_STATE = {
  applicationTat: "0",
  applicationFee: "Yes (125)",
  feeWaiver: "No",
  pgwpEligibility: "No",
  modifiedBy: "Rupal Das Gupta UK B2B",
  createdBy: "Rupal Das Gupta UK B2B",
  applicationType: "conditionalOffer",
  regularApplicationDeadline: "-",
  studentStatus: "New",
  applicationFeeApplicable: "125",
  earlyApplicationDeadline: "-",
  applicationCreationDate: "30th April 2026 | 12:21 PM",
  applicationStatus: "underReview",
  courseName: "MSC in Business with Marketing",
  university: "Warwick Business School",
  preferences: "Firm Choice : Student's First Preferences",
  campusName: "Warwick Campus",
  courseDuration: "1 Year",
  courseSemester: "2",
  intake: "sep2026",
  courseLevel: "masters",
  courseBroadField: "Management and Commerce",
  courseNarrowField: "Sales and Marketing",
  forwardedToThirdParty: "yes",
  forwardedDate: "",
  applicationSubmissionDate: "2026-05-08",
  applicationSubmissionTime: "3:30 PM",
  applicationMode: "",
  portalName: "",
  acknowledgementStatus: "",
  applicationAcknowledgmentNumber: "12345675",
};

// ─── Applicant module initial state ───────────────────────────────────────────
const INITIAL_APPLICANT_STATE = {
  nameAsPerPassport: "Aryan Mehta",
  countryCode: "+91",
  primaryMobile: "9876123456",
  email: "Aryan@gmail.com",
  dateOfBirth: "2000-04-28",
  applicantStatus: "offShore",
  leadBranch: "prodigyConsultancy",
  applicationBranch: "Melbourne", // disabled — from API
  nearestBranch: "gurgaon",
  intakeMonth: "september",
  intakeYear: "2026",
  courseCode: "SIEC 103",
  agentAuthorization: "",
  studentSatisfiedWithSOP: "yes",
  studentLoginId: "",
  studentPassword: "",
  applicationStage: "centralValidation",
  leadingDegree: "",
  entryRequirementMatchBAT: "",
  entryRequirementMatchCAT: "",
};

// ─── Course Preferences initial state — 3 rows matching screenshot ────────────
const INITIAL_PREFERENCES = [
  { id: 1, campus: "warwickCampus", course: "mscBusinessMarketing" },
  { id: 2, campus: "warwickCampus", course: "mscFinance" },
  { id: 3, campus: "warwickCampus", course: "" },
];

/**
 * DashboardPage
 *
 * Single shared shell for the entire dashboard.
 *
 * Owns state for all three modules so data is preserved when switching tabs:
 *  - applicationData + activeApplicationSubTab
 *  - applicantData
 *  - coursePreferences
 *
 * The Offer module lives separately — it will be integrated under the
 * green-header layout by another developer. Its files (OfferSection,
 * OfferAcceptanceSection, offerConstants, ApplicantModule old version)
 * are untouched and safe for future integration.
 */
export default function DashboardPage() {
  // ── Top-level navigation ───────────────────────────────────────────────────
  const [activeTopTab, setActiveTopTab] = useState("application");

  // ── Application module ─────────────────────────────────────────────────────
  const [applicationData, setApplicationData] = useState(INITIAL_APPLICATION_STATE);
  const [activeApplicationSubTab, setActiveApplicationSubTab] = useState(
    APPLICATION_SUB_TABS[0].id
  );

  // ── Applicant module ───────────────────────────────────────────────────────
  const [applicantData, setApplicantData] = useState(INITIAL_APPLICANT_STATE);

  // ── Course Preferences module ──────────────────────────────────────────────
  const [coursePreferences, setCoursePreferences] = useState(INITIAL_PREFERENCES);

  // ── Field change handlers ──────────────────────────────────────────────────
  const handleApplicationChange = (field, value) =>
    setApplicationData((prev) => ({ ...prev, [field]: value }));

  const handleApplicantChange = (field, value) =>
    setApplicantData((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="min-h-screen px-3 py-4 bg-brandNeutral-100 sm:py-6 sm:px-4 lg:py-8">

      {/* ── Outer row: main card + sidebar ──────────────────────────────── */}
      <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row lg:items-start gap-4">

        {/* ── LEFT: Shared main card ─────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-brandNeutral-200">

            {/* Shared top navigation — Application | Applicant | Course Preferences */}
            <TopNavTabs
              tabs={TOP_NAV_TABS}
              activeTab={activeTopTab}
              onChange={setActiveTopTab}
            />

            {/* Inner content — switches by active top tab */}
            <div className="p-3 sm:p-4 lg:p-5">

              {activeTopTab === "application" && (
                <ApplicationModule
                  data={applicationData}
                  onChange={handleApplicationChange}
                  activeSubTab={activeApplicationSubTab}
                  onSubTabChange={setActiveApplicationSubTab}
                />
              )}

              {activeTopTab === "applicant" && (
                <ApplicantModule
                  data={applicantData}
                  onChange={handleApplicantChange}
                />
              )}

              {activeTopTab === "coursePreferences" && (
                <CoursePreferencesModule
                  preferences={coursePreferences}
                  onChange={setCoursePreferences}
                />
              )}

            </div>
          </div>
        </div>

        {/* ── RIGHT: Shared sidebar — persistent across all modules ────────── */}
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
import { useState } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";

import TopNavTabs from "../components/navigation/TopNavTabs";
import SubTabs from "../components/navigation/SubTabs";
import Button from "../components/common/Button";

import ApplicationDetailsSection from "../sections/application/ApplicationDetailsSection";
import CourseDetailsSection from "../sections/application/CourseDetailsSection";
import ApplicationModeInfoSection from "../sections/application/ApplicationModeInfoSection";

import ApplicationScoreCard from "../sections/application/ApplicationScoreCard";
import QuickActionsCard from "../sections/application/QuickActionsCard";

import {
  TOP_NAV_TABS,
  APPLICATION_SUB_TABS,
} from "../constants/applicationConstants";

// ─── Initial form state ───────────────────────────────────────────────────────
const INITIAL_STATE = {
  // Application Details (read-only — API values)
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

  // Course Details (read-only — API values)
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

  // Application Mode Info (editable)
  forwardedToThirdParty: "yes",
  forwardedDate: "",
  applicationSubmissionDate: "2026-05-08",
  applicationSubmissionTime: "3:30 PM",
  applicationMode: "",
  portalName: "",
  acknowledgementStatus: "",
  applicationAcknowledgmentNumber: "12345675",
};

const NEXT_TABS = new Set(["applicationDetails", "courseDetails"]);
const SAVE_TABS = new Set(["applicationModeInfo"]);

export default function ApplicationPage() {
  const [activeTopTab, setActiveTopTab] = useState("application");
  const [activeSubTab, setActiveSubTab] = useState("applicationModeInfo");
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    const idx = APPLICATION_SUB_TABS.findIndex((t) => t.id === activeSubTab);
    if (idx < APPLICATION_SUB_TABS.length - 1) {
      setActiveSubTab(APPLICATION_SUB_TABS[idx + 1].id);
    }
  };

  const handleSave = () => {
    console.log("Save payload:", formData);
  };

  const handleSendAcknowledgement = () => {
    console.log("Send acknowledgement for:", formData.applicationAcknowledgmentNumber);
  };

  return (
    <div className="min-h-screen bg-brandNeutral-100 py-8 px-4">
      {/* ── Outer flex row: main content + sidebar ─────────────────────── */}
      <div className="w-full max-w-[1200px] mx-auto flex items-start gap-4">

        {/* ── LEFT: Main application card ─────────────────────────────── */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl border border-brandNeutral-200 shadow-sm overflow-hidden">

            {/* Top navigation */}
            <TopNavTabs
              tabs={TOP_NAV_TABS}
              activeTab={activeTopTab}
              onChange={setActiveTopTab}
            />

            {/* Inner content area */}
            <div className="p-5">
              <div className="border border-brandNeutral-200 rounded-2xl overflow-hidden">

                {/* Sub-tabs row */}
                <div className="px-5 pt-4 pb-3 border-b border-brandNeutral-100 bg-white">
                  <SubTabs
                    tabs={APPLICATION_SUB_TABS}
                    activeTab={activeSubTab}
                    onChange={setActiveSubTab}
                  />
                </div>

                {/* Form body */}
                <div className="bg-white px-6 pt-6 pb-4 min-h-[420px]">
                  {activeSubTab === "applicationDetails" && (
                    <ApplicationDetailsSection
                      data={formData}
                      onChange={handleFieldChange}
                    />
                  )}
                  {activeSubTab === "courseDetails" && (
                    <CourseDetailsSection
                      data={formData}
                      onChange={handleFieldChange}
                    />
                  )}
                  {activeSubTab === "applicationModeInfo" && (
                    <ApplicationModeInfoSection
                      data={formData}
                      onChange={handleFieldChange}
                    />
                  )}
                </div>

                {/* Footer actions */}
                <div className="bg-white border-t border-brandNeutral-100 px-6 py-4 flex justify-end items-center gap-3">
                  {NEXT_TABS.has(activeSubTab) && (
                    <Button
                      variant="primary"
                      size="md"
                      rightIcon={<ArrowRight size={15} strokeWidth={2.2} />}
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  )}

                  {SAVE_TABS.has(activeSubTab) && (
                    <>
                      <Button
                        variant="outline"
                        size="md"
                        onClick={handleSendAcknowledgement}
                      >
                        Send Acknowledgement to Student
                      </Button>
                      <Button
                        variant="primary"
                        size="md"
                        leftIcon={<CheckCircle size={15} strokeWidth={2.2} />}
                        onClick={handleSave}
                      >
                        Save Details
                      </Button>
                    </>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Sidebar ───────────────────────────────────────────── */}
        <aside className="w-[280px] flex-shrink-0 flex flex-col gap-3">
          <ApplicationScoreCard />
          <QuickActionsCard />
        </aside>

      </div>
    </div>
  );
}

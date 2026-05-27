import { ArrowRight, CheckCircle } from "lucide-react";

import SubTabs from "../../components/navigation/SubTabs";
import Button from "../../components/common/Button";

import ApplicationDetailsSection from "../../sections/application/ApplicationDetailsSection";
import CourseDetailsSection from "../../sections/application/CourseDetailsSection";
import ApplicationModeInfoSection from "../../sections/application/ApplicationModeInfoSection";

import { APPLICATION_SUB_TABS } from "../../constants/applicationConstants";

const NEXT_TABS = new Set(["applicationDetails", "courseDetails"]);
const SAVE_TABS = new Set(["applicationModeInfo"]);

/**
 * ApplicationModule
 *
 * Renders the inner content for the "Application" top-nav tab.
 * Contains: sub-tab bar, form body, footer actions.
 * No outer layout — DashboardPage owns the shell.
 *
 * Props:
 *  data         object  — controlled form state from DashboardPage
 *  onChange     fn      — (field, value) => void
 *  activeSubTab string
 *  onSubTabChange fn
 */
export default function ApplicationModule({
  data,
  onChange,
  activeSubTab,
  onSubTabChange,
}) {
  const handleNext = () => {
    const idx = APPLICATION_SUB_TABS.findIndex((t) => t.id === activeSubTab);
    if (idx < APPLICATION_SUB_TABS.length - 1) {
      onSubTabChange(APPLICATION_SUB_TABS[idx + 1].id);
    }
  };

  // TODO: wire to API service
  const handleSave = () => {};
  const handleSendAcknowledgement = () => {};

  return (
    <div className="overflow-hidden border border-brandNeutral-200 rounded-2xl">

      {/* Sub-tabs — scrollable on narrow screens */}
      <div className="px-3 pt-3 pb-2.5 sm:px-5 sm:pt-4 sm:pb-3 border-b border-brandNeutral-100 bg-white overflow-x-auto">
        <SubTabs
          tabs={APPLICATION_SUB_TABS}
          activeTab={activeSubTab}
          onChange={onSubTabChange}
        />
      </div>

      {/* Form body */}
      <div className="bg-white px-3 pt-4 pb-3 sm:px-5 sm:pt-5 sm:pb-4 lg:px-6 lg:pt-6 lg:pb-4 min-h-[360px] sm:min-h-[400px] lg:min-h-[420px]">
        {activeSubTab === "applicationDetails" && (
          <ApplicationDetailsSection data={data} onChange={onChange} />
        )}
        {activeSubTab === "courseDetails" && (
          <CourseDetailsSection data={data} onChange={onChange} />
        )}
        {activeSubTab === "applicationModeInfo" && (
          <ApplicationModeInfoSection data={data} onChange={onChange} />
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col-reverse items-stretch justify-end gap-2 px-3 py-3 bg-white border-t border-brandNeutral-100 sm:px-6 sm:py-4 sm:flex-row sm:items-center sm:gap-3">
        {NEXT_TABS.has(activeSubTab) && (
          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRight size={15} strokeWidth={2.2} />}
            onClick={handleNext}
            className="justify-center w-full sm:w-auto"
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
              className="justify-center w-full sm:w-auto"
            >
              Send Acknowledgement to Student
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
          </>
        )}
      </div>

    </div>
  );
}
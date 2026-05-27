import { CheckCircle } from "lucide-react";

import Button from "../../components/common/Button";

import ApplicantGeneralDetailsSection from "../../sections/applicant/ApplicantGeneralDetailsSection";

/**
 * ApplicantModule
 *
 * Renders the inner content for the "Applicant" top-nav tab.
 * Currently shows: General Details form + Save Details footer.
 *
 * No outer layout — DashboardPage owns the shell and sidebar.
 *
 * Props:
 *  data     object  — applicant form state (owned by DashboardPage)
 *  onChange fn      — (field, value) => void
 */
export default function ApplicantModule({ data, onChange }) {
  // TODO: await applicantService.save(data)
  const handleSave = () => {};

  return (
    <div className="overflow-hidden border border-brandNeutral-200 rounded-2xl">

      {/* Form body */}
      <div className="bg-white px-3 pt-4 pb-3 sm:px-5 sm:pt-5 sm:pb-4 lg:px-6 lg:pt-6 lg:pb-4 min-h-[420px]">
        <ApplicantGeneralDetailsSection data={data} onChange={onChange} />
      </div>

      {/* Footer */}
      <div className="flex justify-end px-3 py-3 bg-white border-t border-brandNeutral-100 sm:px-6 sm:py-4">
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
  );
}

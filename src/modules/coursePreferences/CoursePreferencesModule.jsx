import { CheckCircle } from "lucide-react";
import Button from "../../components/common/Button";
import CoursePreferencesSection from "../../sections/coursePreferences/CoursePreferencesSection";

/**
 * CoursePreferencesModule
 *
 * Renders the inner content for the "Course Preferences" top-nav tab.
 * No outer layout — DashboardPage owns the shell and sidebar.
 *
 * Props:
 *  preferences  array — [{ id, campus, course }]
 *  onChange     fn    — (updatedPreferences: array) => void
 */
export default function CoursePreferencesModule({ preferences, onChange }) {
  // TODO: await coursePreferencesService.save(preferences)
  const handleSave = () => {};

  return (
    <div className="border border-brandNeutral-200 rounded-2xl overflow-hidden">

      {/* Form body */}
      <div className="bg-white px-3 pt-4 pb-3 sm:px-5 sm:pt-5 sm:pb-4 lg:px-6 lg:pt-6 lg:pb-4 min-h-[420px]">
        <CoursePreferencesSection
          preferences={preferences}
          onChange={onChange}
        />
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-brandNeutral-100 px-3 py-3 sm:px-6 sm:py-4 flex justify-end">
        <Button
          variant="primary"
          size="md"
          leftIcon={<CheckCircle size={15} strokeWidth={2.2} />}
          onClick={handleSave}
          className="w-full sm:w-auto justify-center"
        >
          Save Details
        </Button>
      </div>

    </div>
  );
}

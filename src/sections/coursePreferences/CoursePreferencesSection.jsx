import { PlusCircle, Trash2 } from "lucide-react";
import SelectField from "../../components/forms/SelectField";
import { CAMPUS_OPTIONS, COURSE_OPTIONS } from "../../constants/applicantConstants";

export default function CoursePreferencesSection({ preferences = [], onChange }) {
  // ── Add a new blank row ────────────────────────────────────────────────────
  const handleAdd = () => {
    onChange([
      ...preferences,
      { id: Date.now(), campus: "", course: "" },
    ]);
  };

  // ── Remove a row by id ─────────────────────────────────────────────────────
  const handleRemove = (id) => {
    // Always keep at least one row
    if (preferences.length <= 1) return;
    onChange(preferences.filter((p) => p.id !== id));
  };

  // ── Update a single field inside a row ─────────────────────────────────────
  const handleRowChange = (id, field, value) => {
    onChange(
      preferences.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-6">

      {/* Section header */}
      <div className="pb-1">
        <h3 className="text-[14px] font-semibold text-brandNeutral-800">
          More Course Preferences
        </h3>
      </div>

      {/* Preference rows */}
      <div className="flex flex-col gap-4">
        {preferences.map((pref, index) => (
          <div key={pref.id} className="flex items-end gap-3">

            {/* Campus */}
            <div className="flex-1 min-w-0">
              <SelectField
                label="Campus"
                name={`campus_${pref.id}`}
                placeholder="Select Campus"
                options={CAMPUS_OPTIONS}
                value={pref.campus}
                onChange={(e) => handleRowChange(pref.id, "campus", e.target.value)}
              />
            </div>

            {/* Course */}
            <div className="flex-1 min-w-0">
              <SelectField
                label="Course"
                name={`course_${pref.id}`}
                placeholder="Select Course"
                options={COURSE_OPTIONS}
                value={pref.course}
                onChange={(e) => handleRowChange(pref.id, "course", e.target.value)}
              />
            </div>

            {/* Remove row button — hidden on first row if only one row exists */}
            <div className="flex-shrink-0 pb-[1px]">
              {preferences.length > 1 ? (
                <button
                  type="button"
                  title="Remove this preference"
                  aria-label="Remove preference row"
                  onClick={() => handleRemove(pref.id)}
                  className={[
                    "w-[38px] h-[42px] rounded-lg flex items-center justify-center flex-shrink-0",
                    "border border-brandNeutral-200 bg-brandNeutral-50",
                    "text-red-400 hover:bg-red-50 hover:border-red-200",
                    "transition-colors duration-150 focus:outline-none",
                  ].join(" ")}
                >
                  <Trash2 size={14} strokeWidth={1.8} />
                </button>
              ) : (
                // Spacer to keep layout stable when remove button is absent
                <div className="w-[38px]" />
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Add row button */}
      <div>
        <button
          type="button"
          onClick={handleAdd}
          className={[
            "inline-flex items-center gap-2 px-4 h-9 rounded-xl",
            "border border-brandPrimary-500 text-brandPrimary-600",
            "text-[12.5px] font-medium bg-white",
            "hover:bg-brandPrimary-50 transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-brandPrimary-500/30",
          ].join(" ")}
        >
          <PlusCircle size={14} strokeWidth={1.8} />
          Add Preference
        </button>
      </div>

    </div>
  );
}

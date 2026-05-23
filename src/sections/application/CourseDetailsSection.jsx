import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import FormGrid from "../../components/forms/FormGrid";
import {
  COURSE_LEVEL_OPTIONS,
  INTAKE_OPTIONS,
} from "../../constants/applicationConstants";

/**
 * CourseDetailsSection
 *
 * All fields are disabled — values come from API.
 *
 * Props:
 *  data     object
 *  onChange fn — (field, value) => void
 */
export default function CourseDetailsSection({ data = {}, onChange }) {
  const field = (name) => ({
    name,
    value: data[name] ?? "",
    disabled: true,
    onChange: (e) => onChange && onChange(name, e.target.value),
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Row 1 */}
      <FormGrid>
        <InputField
          label="Course Name"
          placeholder="MSC in Business with Marketing"
          {...field("courseName")}
        />
        <InputField
          label="University"
          placeholder="Warwick Business School"
          {...field("university")}
        />
        <InputField
          label="Preferences"
          placeholder="Firm Choice : Student's First Preferences"
          {...field("preferences")}
        />
      </FormGrid>

      {/* Row 2 */}
      <FormGrid>
        <InputField
          label="Campus Name"
          placeholder="Warwick Campus"
          {...field("campusName")}
        />
        <InputField
          label="Course Duration"
          placeholder="1 Year"
          {...field("courseDuration")}
        />
        <InputField
          label="Course Semester"
          placeholder="2"
          {...field("courseSemester")}
        />
      </FormGrid>

      {/* Row 3 */}
      <FormGrid>
        <SelectField
          label="Intake"
          placeholder="Select Intake"
          options={INTAKE_OPTIONS}
          {...field("intake")}
        />
        <SelectField
          label="Course Level"
          placeholder="Select Level"
          options={COURSE_LEVEL_OPTIONS}
          {...field("courseLevel")}
        />
        <InputField
          label="Course Broad Field"
          placeholder="Management and Commerce"
          {...field("courseBroadField")}
        />
      </FormGrid>

      {/* Row 4 — single field */}
      <FormGrid>
        <InputField
          label="Course Narrow Field"
          placeholder="Sales and Marketing"
          {...field("courseNarrowField")}
        />
      </FormGrid>
    </div>
  );
}

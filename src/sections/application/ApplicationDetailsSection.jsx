import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import FormGrid from "../../components/forms/FormGrid";

import {
  APPLICATION_STATUS_OPTIONS,
  APPLICATION_TYPE_OPTIONS,
} from "../../constants/applicationConstants";

/**
 * ApplicationDetailsSection
 *
 * All fields are disabled — values come from API.
 * onChange is accepted but not wired; kept for future API-edit mode.
 *
 * Props:
 *  data     object
 *  onChange fn — (field, value) => void
 */
export default function ApplicationDetailsSection({ data = {}, onChange }) {
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
          label="Application TAT"
          placeholder="0"
          {...field("applicationTat")}
        />
        <InputField
          label="Application Fee"
          placeholder="Yes (125)"
          {...field("applicationFee")}
        />
        <InputField
          label="Fee Waiver (If Applicable)"
          placeholder="No"
          {...field("feeWaiver")}
        />
      </FormGrid>

      {/* Row 2 */}
      <FormGrid>
        <InputField
          label="PGWP Eligibility"
          placeholder="No"
          {...field("pgwpEligibility")}
        />
        <InputField
          label="Modified By"
          placeholder="—"
          {...field("modifiedBy")}
        />
        <InputField
          label="Created By"
          placeholder="—"
          {...field("createdBy")}
        />
      </FormGrid>

      {/* Row 3 */}
      <FormGrid>
        <SelectField
          label="Application Type"
          placeholder="Select Type"
          options={APPLICATION_TYPE_OPTIONS}
          {...field("applicationType")}
        />
        <InputField
          label="Regular Application Deadline"
          placeholder="—"
          {...field("regularApplicationDeadline")}
        />
        <InputField
          label="Student Status"
          placeholder="New"
          {...field("studentStatus")}
        />
      </FormGrid>

      {/* Row 4 */}
      <FormGrid>
        <InputField
          label="Application Fee (If Applicable)"
          placeholder="125"
          {...field("applicationFeeApplicable")}
        />
        <InputField
          label="Early Application Deadline"
          placeholder="—"
          {...field("earlyApplicationDeadline")}
        />
        <InputField
          label="Application Creation Date"
          placeholder="30th April 2026 | 12:21 PM"
          {...field("applicationCreationDate")}
        />
      </FormGrid>

      {/* Row 5 — single field */}
      <FormGrid>
        <SelectField
          label="Application Status"
          placeholder="Select Status"
          options={APPLICATION_STATUS_OPTIONS}
          {...field("applicationStatus")}
        />
      </FormGrid>
    </div>
  );
}

import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import RadioGroup from "../../components/forms/RadioGroup";
import FormGrid from "../../components/forms/FormGrid";
import {
  COUNTRY_CODE_OPTIONS,
  APPLICANT_STATUS_OPTIONS,
  LEAD_BRANCH_OPTIONS,
  NEAREST_BRANCH_OPTIONS,
  INTAKE_MONTH_OPTIONS,
  INTAKE_YEAR_OPTIONS,
  AGENT_AUTH_OPTIONS,
  APPLICATION_STAGE_OPTIONS,
  LEADING_DEGREE_OPTIONS,
} from "../../constants/applicantConstants";

export default function ApplicantGeneralDetailsSection({ data = {}, onChange }) {
  // ── Editable field factory ─────────────────────────────────────────────────
  const field = (name) => ({
    name,
    value: data[name] ?? "",
    onChange: (e) => onChange && onChange(name, e.target.value),
  });

  // ── Disabled field factory ─────────────────────────────────────────────────
  const disabledField = (name) => ({
    name,
    value: data[name] ?? "",
    disabled: true,
  });

  // ── Radio handler ──────────────────────────────────────────────────────────
  const handleRadio = (name) => (value) => onChange && onChange(name, value);

  return (
    <div className="flex flex-col gap-5 sm:gap-6">

      {/* Section header */}
      <div className="pb-1">
        <h3 className="text-[14px] font-semibold text-brandNeutral-800">
          General Details
        </h3>
      </div>

      {/* Row 1 — Name | Primary Mobile | Email */}
      <FormGrid>
        <InputField
          label="Name as per Passport"
          placeholder="Enter name"
          {...field("nameAsPerPassport")}
        />

        {/* Primary Mobile — country code select + number input side by side */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[13px] font-medium text-brandNeutral-600 leading-none">
            Primary Mobile
          </span>
          <div className="flex gap-2">
            {/* Country code — fixed narrow width */}
            <div className="w-[96px] flex-shrink-0">
              <SelectField
                name="countryCode"
                value={data.countryCode ?? "+91"}
                onChange={(e) => onChange && onChange("countryCode", e.target.value)}
                options={COUNTRY_CODE_OPTIONS}
                placeholder="+91"
              />
            </div>
            {/* Phone number — grows to fill */}
            <div className="flex-1">
              <InputField
                name="primaryMobile"
                value={data.primaryMobile ?? ""}
                onChange={(e) => onChange && onChange("primaryMobile", e.target.value)}
                placeholder="Enter mobile number"
                type="tel"
              />
            </div>
          </div>
        </div>

        <InputField
          label="Email"
          placeholder="Enter email"
          type="email"
          {...field("email")}
        />
      </FormGrid>

      {/* Row 2 — Date of Birth | Status | Lead Branch */}
      <FormGrid>
        <InputField
          label="Date of Birth"
          type="date"
          {...field("dateOfBirth")}
        />
        <SelectField
          label="Status"
          placeholder="Select Status"
          options={APPLICANT_STATUS_OPTIONS}
          {...field("applicantStatus")}
        />
        <SelectField
          label="Lead Branch"
          placeholder="Select Lead Branch"
          options={LEAD_BRANCH_OPTIONS}
          {...field("leadBranch")}
        />
      </FormGrid>

      {/* Row 3 — Application Branch (disabled/API) | Nearest Branch | Intake Month */}
      <FormGrid>
        <InputField
          label="Application Branch"
          {...disabledField("applicationBranch")}
        />
        <SelectField
          label="Nearest Branch"
          placeholder="Select Branch"
          options={NEAREST_BRANCH_OPTIONS}
          {...field("nearestBranch")}
        />
        <SelectField
          label="Intake Month"
          placeholder="Select Month"
          options={INTAKE_MONTH_OPTIONS}
          {...field("intakeMonth")}
        />
      </FormGrid>

      {/* Row 4 — Intake Year | Course Code | Agent Authorization/Change */}
      <FormGrid>
        <SelectField
          label="Intake Year"
          placeholder="Select Year"
          options={INTAKE_YEAR_OPTIONS}
          {...field("intakeYear")}
        />
        <InputField
          label="Course Code"
          placeholder="Enter course code"
          {...field("courseCode")}
        />
        <SelectField
          label="Agent Authorization/Change"
          placeholder="Select Agent Authorization/Change"
          options={AGENT_AUTH_OPTIONS}
          {...field("agentAuthorization")}
        />
      </FormGrid>

      {/* Row 5 — Student Satisfied With SOP | Student Login ID | Student Password */}
      <FormGrid>
        <RadioGroup
          label="Student Satisfied With SOP"
          name="studentSatisfiedWithSOP"
          value={data.studentSatisfiedWithSOP ?? "yes"}
          onChange={handleRadio("studentSatisfiedWithSOP")}
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
        />
        <InputField
          label="Student Login ID"
          placeholder="Enter Login ID"
          {...field("studentLoginId")}
        />
        <InputField
          label="Student Password"
          placeholder="Enter Password"
          type="password"
          {...field("studentPassword")}
        />
      </FormGrid>

      {/* Row 6 — Application Stage | Leading Degree | Entry Requirement Match (BAT) */}
      <FormGrid>
        <SelectField
          label="Application Stage"
          placeholder="Select Stage"
          options={APPLICATION_STAGE_OPTIONS}
          {...field("applicationStage")}
        />
        <SelectField
          label="Leading Degree"
          placeholder="Select Leading Degree"
          options={LEADING_DEGREE_OPTIONS}
          {...field("leadingDegree")}
        />

        {/* Entry Requirement Match — BAT badge + Yes/No radio */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-medium text-brandNeutral-600 leading-none">
              Entry Requirement Match
            </span>
            <span className="inline-flex items-center justify-center h-5 px-2 rounded text-[10.5px] font-bold bg-brandPrimary-50 text-brandPrimary-700 border border-brandPrimary-200">
              BAT
            </span>
          </div>
          <RadioGroup
            name="entryRequirementMatchBAT"
            value={data.entryRequirementMatchBAT ?? ""}
            onChange={handleRadio("entryRequirementMatchBAT")}
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
          />
        </div>
      </FormGrid>

      {/* Row 7 — Entry Requirement Match (CAT) — standalone, left-aligned */}
      <FormGrid>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-medium text-brandNeutral-600 leading-none">
              Entry Requirement Match
            </span>
            <span className="inline-flex items-center justify-center h-5 px-2 rounded text-[10.5px] font-bold bg-brandPrimary-50 text-brandPrimary-700 border border-brandPrimary-200">
              CAT
            </span>
          </div>
          <RadioGroup
            name="entryRequirementMatchCAT"
            value={data.entryRequirementMatchCAT ?? ""}
            onChange={handleRadio("entryRequirementMatchCAT")}
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
          />
        </div>
      </FormGrid>

    </div>
  );
}

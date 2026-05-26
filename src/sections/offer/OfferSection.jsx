import { Download, Eye, Trash2 } from "lucide-react";

import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import RadioGroup from "../../components/forms/RadioGroup";
import FormGrid from "../../components/forms/FormGrid";

import {
  OFFER_STATUS_OPTIONS,
  OFFER_PREFERENCE_OPTIONS,
  SCHOLARSHIP_GIVEN_ON_OPTIONS,
  CONDITIONS_OPTIONS,
} from "../../constants/offerConstants";

/**
 * OfferSection — presentational. OfferPage owns all state.
 *
 * Disabled fields:
 *  annualTuitionFeesAUD / INR, totalTuitionFeesAUD / INR  → from API
 *  annualFeesAfterScholarshipINR                          → auto-calculated
 *  totalFeesAfterScholarshipINR                           → auto-calculated
 *  totalAnnualFeesAUD / INR                               → auto-calculated
 *
 * Props:
 *  data           object
 *  onChange       fn — (field: string, value: string) => void
 *  documentFile   { name: string, url: string } | null
 *  onDocDownload  fn
 *  onDocView      fn
 *  onDocDelete    fn
 */
export default function OfferSection({
  data = {},
  onChange,
  documentFile,
  onDocDownload,
  onDocView,
  onDocDelete,
}) {
  // ── field() — editable controlled input props ──────────────────────────────
  const field = (name) => ({
    name,
    value: data[name] ?? "",
    onChange: (e) => onChange && onChange(name, e.target.value),
  });

  // ── disabledField() — read-only display props ──────────────────────────────
  const disabledField = (name) => ({
    name,
    value: data[name] ?? "",
    disabled: true,
  });

  // ── Radio change helper ────────────────────────────────────────────────────
  const handleRadio = (name) => (value) => onChange && onChange(name, value);

  return (
    <div className="flex flex-col gap-5 sm:gap-6">

      {/* Section label */}
      <p className="text-[12.5px] brand-neutral-900 font-normal px-1">
        Data to be filled from offer letter
      </p>

      {/* Row 1 — Student ID | Offer Status | Offer Preference For */}
      <FormGrid>
        <InputField
          label="Student ID"
          placeholder="Enter ID"
          {...field("studentId")}
        />
        <SelectField
          label="Offer Status"
          placeholder="Select Status"
          options={OFFER_STATUS_OPTIONS}
          {...field("offerStatus")}
        />
        <SelectField
          label="Offer Preference For"
          placeholder="Select Preference"
          options={OFFER_PREFERENCE_OPTIONS}
          {...field("offerPreferenceFor")}
        />
      </FormGrid>

      {/* Row 2 — Auto Calculation Fees | Course Start Date | Est. Completion Date */}
      <FormGrid>
        <RadioGroup
          label="Auto Calculation Fees"
          name="autoCalculationFees"
          value={data.autoCalculationFees ?? "yes"}
          onChange={handleRadio("autoCalculationFees")}
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
        />
        <InputField
          label="Course Start Date"
          type="date"
          {...field("courseStartDate")}
        />
        <InputField
          label="Estimated Course Completion Date"
          type="date"
          {...field("estimatedCourseCompletionDate")}
        />
      </FormGrid>

      {/* Row 3 — Conditional Offer Date | Lapse Date | Specify Conditions */}
      <FormGrid>
        <InputField
          label="Conditional Offer Date"
          type="date"
          {...field("conditionalOfferDate")}
        />
        <InputField
          label="Conditional Offer Lapse Date"
          type="date"
          {...field("conditionalOfferLapseDate")}
        />
        {/*
          TODO: Replace with a multi-select/checklist component.
          Currently a single-value select as a placeholder.
          The "3 Selected" display from the screenshot will be implemented
          when the multi-select component is built.
        */}
        <SelectField
          label="Specify Conditions For Conditional Offer"
          placeholder="Select Conditions"
          options={CONDITIONS_OPTIONS}
          {...field("specifyConditions")}
        />
      </FormGrid>

      {/* Row 4 — Annual Fees AUD (API) | Annual Fees INR (API) | Total Fees AUD (API) */}
      <FormGrid>
        <InputField
          label="Annual Tuition Fees (AUD)"
          {...disabledField("annualTuitionFeesAUD")}
        />
        <InputField
          label="Annual Tuition Fees (INR)"
          {...disabledField("annualTuitionFeesINR")}
        />
        <InputField
          label="Total Tuition Fees (AUD)"
          {...disabledField("totalTuitionFeesAUD")}
        />
      </FormGrid>

      {/* Row 5 — Total Fees INR (API) | % Scholarship Provided? | Scholarship Given On */}
      <FormGrid>
        <InputField
          label="Total Tuition Fees (INR)"
          {...disabledField("totalTuitionFeesINR")}
        />
        <RadioGroup
          label="% Scholarship Provided ?"
          name="scholarshipProvided"
          value={data.scholarshipProvided ?? "no"}
          onChange={handleRadio("scholarshipProvided")}
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
        />
        {/* Disabled when no scholarship selected */}
        <SelectField
          label="Scholarship Given On"
          placeholder="Select"
          options={SCHOLARSHIP_GIVEN_ON_OPTIONS}
          disabled={data.scholarshipProvided !== "yes"}
          {...field("scholarshipGivenOn")}
        />
      </FormGrid>

      {/* Scholarship rows — only mounted when scholarship is active */}
      {data.scholarshipProvided === "yes" && (
        <>
          {/* Row 6 — Scholarship Type | Amount (AUD) | Annual After Scholarship (AUD) */}
          <FormGrid>
            <RadioGroup
              label="Scholarship Type ?"
              name="scholarshipType"
              value={data.scholarshipType ?? "percentage"}
              onChange={handleRadio("scholarshipType")}
              options={[
                { label: "Percentage", value: "percentage" },
                { label: "Fixed Amount", value: "fixedAmount" },
              ]}
            />
            <InputField
              label="Amount Of Scholarship (AUD)"
              placeholder="0.00"
              {...field("scholarshipAmountAUD")}
            />
            <InputField
              label="Annual Tuition Fees After Scholarship (AUD)"
              placeholder="0.00"
              {...field("annualFeesAfterScholarshipAUD")}
            />
          </FormGrid>

          {/* Row 7 — Annual After Scholarship (INR, calc) | Total After Scholarship (AUD) | Total After Scholarship (INR, calc) */}
          <FormGrid>
            <InputField
              label="Total Tuition Fees After Scholarship (INR)"
              {...disabledField("annualFeesAfterScholarshipINR")}
            />
            <InputField
              label="Total Tuition Fees After Scholarship (AUD)"
              placeholder="0.00"
              {...field("totalFeesAfterScholarshipAUD")}
            />
            <InputField
              label="Total Tuition Fees After Scholarship (INR)"
              {...disabledField("totalFeesAfterScholarshipINR")}
            />
          </FormGrid>
        </>
      )}

      {/* Row 8 — OSHC Fees | Total Annual Fees AUD (calc) | Total Annual Fees INR (calc) */}
      <FormGrid>
        <InputField
          label="OSHC Fees"
          placeholder="0.00"
          {...field("oshcFees")}
        />
        <InputField
          label="Total Annual Fees (AUD)"
          {...disabledField("totalAnnualFeesAUD")}
        />
        <InputField
          label="Total Annual Fees (INR)"
          {...disabledField("totalAnnualFeesINR")}
        />
      </FormGrid>

      {/* Row 9 — Conditional Offer Document */}
      <div>
        <span className="text-[13px] font-medium text-brandNeutral-600 leading-none block mb-1.5">
          Conditional Offer Document
        </span>

        {documentFile ? (
          <div className="flex items-center gap-2">
            <DocAction
              icon={
                <Download
                  size={15}
                  strokeWidth={1.8}
                  className="text-brandNeutral-500"
                />
              }
              title={`Download ${documentFile.name}`}
              onClick={onDocDownload}
            />
            <DocAction
              icon={
                <Eye
                  size={15}
                  strokeWidth={1.8}
                  className="text-brandPrimary-500"
                />
              }
              title={`View ${documentFile.name}`}
              onClick={onDocView}
            />
            <DocAction
              icon={
                <Trash2
                  size={15}
                  strokeWidth={1.8}
                  className="text-red-400"
                />
              }
              title="Delete document"
              onClick={onDocDelete}
            />
          </div>
        ) : (
          <span className="text-[12.5px] text-brandNeutral-400 italic">
            No document attached
          </span>
        )}
      </div>

    </div>
  );
}

// ─── DocAction — icon button, consistent with ApplicationModeInfoSection ──────
function DocAction({ icon, title, onClick }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className={[
        "w-[38px] h-[38px] rounded-lg border border-brandNeutral-200 bg-brandNeutral-50",
        "flex items-center justify-center flex-shrink-0",
        "hover:bg-brandNeutral-100 hover:border-brandNeutral-300 transition-colors duration-150",
        "focus:outline-none focus:ring-2 focus:ring-brandSecondary-400/50",
      ].join(" ")}
    >
      {icon}
    </button>
  );
}
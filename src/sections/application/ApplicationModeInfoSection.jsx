import { useState, useRef } from "react";
import { Clock, Download, Eye, Trash2, X } from "lucide-react";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import RadioGroup from "../../components/forms/RadioGroup";
import FormGrid from "../../components/forms/FormGrid";
import {
  APPLICATION_MODE_OPTIONS,
  PORTAL_OPTIONS,
  ACKNOWLEDGEMENT_STATUS_OPTIONS,
} from "../../constants/applicationConstants";

// ─── Placeholder acknowledgement file (used for Download + View) ──────────────
const PLACEHOLDER_FILE = {
  name: "acknowledgement_12345675.pdf",
  // Minimal valid 1-page PDF encoded as base64 data URI
  // This allows browser-native download and preview without any backend
  dataUri:
    "data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPJ4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA0MDAgMjAwXQovQ29udGVudHMgNCAwIFIKL1Jlc291cmNlcyA8PAovRm9udCA8PAovRjEgNSAwIFIKPj4KPj4KPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0xlbmd0aCAxMDQKPj4Kc3RyZWFtCkJUCi9GMSAxNiBUZgoxMDAgMTQwIFRkCihBY2tub3dsZWRnZW1lbnQgRG9jdW1lbnQpIFRqCi9GMSA5IFRmCjEwMCA5MCBUZAooUmVmOiAxMjM0NTY3NSAtIFNhbXBsZSBQbGFjZWhvbGRlcikgVGoKRVQKZW5kc3RyZWFtCmVuZG9iago1IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9TdWJ0eXBlIC9UeXBlMQovQmFzZUZvbnQgL0hlbHZldGljYQo+PgplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAwNjggMDAwMDAgbiAKMDAwMDAwMDEyNSAwMDAwMCBuIAowMDAwMDAwMjc0IDAwMDAwIG4gCjAwMDAwMDA0MzAgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA2Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo1MDYKJSVFT0YK",
};

/**
 * ApplicationModeInfoSection
 *
 * Functional fields:
 *  - Forwarded Date          → native date picker
 *  - Application Submission Date → native date picker
 *  - Application Acknowledgment Number → disabled (API value)
 *  - Download button         → triggers browser file download
 *  - View button             → opens inline preview modal
 *  - Delete button           → removes acknowledgement from UI state
 *
 * Props:
 *  data     object
 *  onChange fn — (field, value) => void
 */
export default function ApplicationModeInfoSection({ data = {}, onChange }) {
  // Controls whether the acknowledgement actions row is visible
  const [hasAcknowledgement, setHasAcknowledgement] = useState(true);
  // Controls the inline preview modal
  const [showPreview, setShowPreview] = useState(false);

  const field = (name) => ({
    name,
    value: data[name] ?? "",
    onChange: (e) => onChange && onChange(name, e.target.value),
  });

  const handleRadio = (name) => (value) => onChange && onChange(name, value);

  // ── Date field: returns props for a native <input type="date"> ────────────
  // We keep the internal format as YYYY-MM-DD (native date value) but display
  // a formatted string when there's a value.
  const dateField = (name) => ({
    name,
    type: "date",
    value: data[name] ?? "",
    onChange: (e) => onChange && onChange(name, e.target.value),
    // Override placeholder — native date inputs show mm/dd/yyyy natively
    placeholder: "Select Date",
    inputClass: "text-gray-700",
  });

  // ── Download handler ──────────────────────────────────────────────────────
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = PLACEHOLDER_FILE.dataUri;
    link.download = PLACEHOLDER_FILE.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ── View / Preview handler ────────────────────────────────────────────────
  const handleView = () => {
    setShowPreview(true);
  };

  // ── Delete handler ────────────────────────────────────────────────────────
  const handleDelete = () => {
    setHasAcknowledgement(false);
    // Clear acknowledgement number from parent state
    onChange && onChange("applicationAcknowledgmentNumber", "");
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Row 1 */}
        <FormGrid>
          <RadioGroup
            label="Forwarded To Third Party"
            name="forwardedToThirdParty"
            value={data.forwardedToThirdParty ?? "yes"}
            onChange={handleRadio("forwardedToThirdParty")}
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
          />

          {/* Forwarded Date — functional native date picker */}
          <InputField
            label="Forwarded Date"
            {...dateField("forwardedDate")}
          />

          {/* Application Submission Date — functional native date picker */}
          <InputField
            label="Application Submission Date"
            {...dateField("applicationSubmissionDate")}
          />
        </FormGrid>

        {/* Row 2 */}
        <FormGrid>
          <InputField
            label="Application Submission Time"
            placeholder="3:30 PM"
            rightIcon={<Clock size={15} strokeWidth={1.8} />}
            {...field("applicationSubmissionTime")}
          />
          <SelectField
            label="Application Mode"
            placeholder="Select Mode"
            options={APPLICATION_MODE_OPTIONS}
            {...field("applicationMode")}
          />
          <SelectField
            label="Portal Name"
            placeholder="Select Portal"
            options={PORTAL_OPTIONS}
            {...field("portalName")}
          />
        </FormGrid>

        {/* Row 3 */}
        <FormGrid>
          <SelectField
            label="Acknowledgement Status"
            placeholder="Select Status"
            options={ACKNOWLEDGEMENT_STATUS_OPTIONS}
            {...field("acknowledgementStatus")}
          />

          {/* Acknowledgment Number — disabled, value from API */}
          <InputField
            label="Application Acknowledgment Number"
            placeholder="—"
            name="applicationAcknowledgmentNumber"
            value={data.applicationAcknowledgmentNumber ?? ""}
            disabled={true}
          />

          {/* Acknowledgement file action buttons */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-gray-600 leading-none">
              Acknowledgement
            </span>

            {hasAcknowledgement ? (
              <div className="flex items-center gap-2 h-[42px]">
                <AcknowledgementAction
                  icon={<Download size={15} strokeWidth={1.8} className="text-gray-500" />}
                  title="Download acknowledgement"
                  onClick={handleDownload}
                />
                <AcknowledgementAction
                  icon={<Eye size={15} strokeWidth={1.8} className="text-teal-500" />}
                  title="Preview acknowledgement"
                  onClick={handleView}
                />
                <AcknowledgementAction
                  icon={<Trash2 size={15} strokeWidth={1.8} className="text-red-400" />}
                  title="Delete acknowledgement"
                  onClick={handleDelete}
                />
              </div>
            ) : (
              <div className="flex items-center h-[42px]">
                <span className="text-[12.5px] text-gray-400 italic">
                  No file attached
                </span>
              </div>
            )}
          </div>
        </FormGrid>
      </div>

      {/* ── Preview Modal ───────────────────────────────────────────────────── */}
      {showPreview && (
        <PreviewModal
          fileUri={PLACEHOLDER_FILE.dataUri}
          fileName={PLACEHOLDER_FILE.name}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}

// ─── Small icon button ────────────────────────────────────────────────────────
function AcknowledgementAction({ icon, title, onClick }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={[
        "w-[38px] h-[38px] rounded-lg border border-gray-200 bg-gray-50",
        "flex items-center justify-center",
        "hover:bg-gray-100 hover:border-gray-300 transition-colors duration-150",
        "focus:outline-none focus:ring-2 focus:ring-yellow-300/50",
      ].join(" ")}
    >
      {icon}
    </button>
  );
}

// ─── Preview Modal ────────────────────────────────────────────────────────────
function PreviewModal({ fileUri, fileName, onClose }) {
  return (
    // Backdrop — click outside to close
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
      onClick={onClose}
    >
      {/* Modal panel — stop propagation so clicks inside don't close it */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
        style={{ width: "min(720px, 92vw)", height: "min(540px, 88vh)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 flex-shrink-0">
          <span className="text-[13.5px] font-medium text-gray-700 truncate">
            {fileName}
          </span>
          <button
            type="button"
            onClick={onClose}
            title="Close preview"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors duration-150 focus:outline-none"
          >
            <X size={15} strokeWidth={2} />
          </button>
        </div>

        {/* PDF iframe */}
        <iframe
          src={fileUri}
          title="Acknowledgement preview"
          className="flex-1 w-full border-0"
        />

        {/* Modal footer */}
        <div className="flex justify-end px-5 py-3 border-t border-gray-100 flex-shrink-0 gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-9 px-4 rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition-colors duration-150 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

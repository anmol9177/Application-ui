import { useState } from "react";
import {Clock, Download, Eye, Trash2, X } from "lucide-react";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import RadioGroup from "../../components/forms/RadioGroup";
import FormGrid from "../../components/forms/FormGrid";
import {
  APPLICATION_MODE_OPTIONS,
  PORTAL_OPTIONS,
  ACKNOWLEDGEMENT_STATUS_OPTIONS,
} from "../../constants/applicationConstants";

const PLACEHOLDER_FILE = {
  name: "acknowledgement_12345675.pdf",
  dataUri:
    "data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPJ4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA0MDAgMjAwXQovQ29udGVudHMgNCAwIFIKL1Jlc291cmNlcyA8PAovRm9udCA8PAovRjEgNSAwIFIKPj4KPj4KPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0xlbmd0aCAxMDQKPj4Kc3RyZWFtCkJUCi9GMSAxNiBUZgoxMDAgMTQwIFRkCihBY2tub3dsZWRnZW1lbnQgRG9jdW1lbnQpIFRqCi9GMSA5IFRmCjEwMCA5MCBUZAooUmVmOiAxMjM0NTY3NSAtIFNhbXBsZSBQbGFjZWhvbGRlcikgVGoKRVQKZW5kc3RyZWFtCmVuZG9iago1IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9TdWJ0eXBlIC9UeXBlMQovQmFzZUZvbnQgL0hlbHZldGljYQo+PgplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAwNjggMDAwMDAgbiAKMDAwMDAwMDEyNSAwMDAwMCBuIAowMDAwMDAwMjc0IDAwMDAwIG4gCjAwMDAwMDA0MzAgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA2Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo1MDYKJSVFT0YK",
};

export default function ApplicationModeInfoSection({ data = {}, onChange }) {
  const [hasAcknowledgement, setHasAcknowledgement] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  const field = (name) => ({
    name,
    value: data[name] ?? "",
    onChange: (e) => onChange && onChange(name, e.target.value),
  });

  const handleRadio = (name) => (value) => onChange && onChange(name, value);

  const dateField = (name) => ({
    name,
    type: "date",
    value: data[name] ?? "",
    onChange: (e) => onChange && onChange(name, e.target.value),
    placeholder: "Select Date",
    inputClass: "text-brandNeutral-700",
  });

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = PLACEHOLDER_FILE.dataUri;
    link.download = PLACEHOLDER_FILE.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = () => setShowPreview(true);

  const handleDelete = () => {
    setHasAcknowledgement(false);
    onChange && onChange("applicationAcknowledgmentNumber", "");
  };

  return (
    <>
      <div className="flex flex-col gap-6">
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
          <InputField label="Forwarded Date" {...dateField("forwardedDate")} />
          <InputField label="Application Submission Date" {...dateField("applicationSubmissionDate")} />
        </FormGrid>

        <FormGrid>
          <InputField
            label="Application Submission Time"
            placeholder="3:30 PM"
            rightIcon={<Clock size={15} strokeWidth={1.8} />}
            {...field("applicationSubmissionTime")}
          />
          <SelectField label="Application Mode" placeholder="Select Mode" options={APPLICATION_MODE_OPTIONS} {...field("applicationMode")} />
          <SelectField label="Portal Name" placeholder="Select Portal" options={PORTAL_OPTIONS} {...field("portalName")} />
        </FormGrid>

        <FormGrid>
          <SelectField label="Acknowledgement Status" placeholder="Select Status" options={ACKNOWLEDGEMENT_STATUS_OPTIONS} {...field("acknowledgementStatus")} />
          <InputField
            label="Application Acknowledgment Number"
            placeholder="—"
            name="applicationAcknowledgmentNumber"
            value={data.applicationAcknowledgmentNumber ?? ""}
            disabled={true}
          />

          <div className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-brandNeutral-600 leading-none">
              Acknowledgement
            </span>
            {hasAcknowledgement ? (
              <div className="flex items-center gap-2 h-[42px]">
                <AcknowledgementAction
                  icon={<Download size={15} strokeWidth={1.8} className="text-brandNeutral-500" />}
                  title="Download acknowledgement"
                  onClick={handleDownload}
                />
                <AcknowledgementAction
                  icon={<Eye size={15} strokeWidth={1.8} className="text-brandPrimary-500" />}
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
                <span className="text-[12.5px] text-brandNeutral-400 italic">
                  No file attached
                </span>
              </div>
            )}
          </div>
        </FormGrid>
      </div>

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

function AcknowledgementAction({ icon, title, onClick }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={[
        "w-[38px] h-[38px] rounded-lg border border-brandNeutral-200 bg-brandNeutral-50",
        "flex items-center justify-center",
        "hover:bg-brandNeutral-100 hover:border-brandNeutral-300 transition-colors duration-150",
        "focus:outline-none focus:ring-2 focus:ring-brandSecondary-400/50",
      ].join(" ")}
    >
      {icon}
    </button>
  );
}

function PreviewModal({ fileUri, fileName, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl border border-brandNeutral-200 flex flex-col overflow-hidden"
        style={{ width: "min(720px, 92vw)", height: "min(540px, 88vh)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-brandNeutral-100 flex-shrink-0">
          <span className="text-[13.5px] font-medium text-brandNeutral-700 truncate">
            {fileName}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-brandNeutral-400 hover:bg-brandNeutral-100 hover:text-brandNeutral-600 transition-colors duration-150 focus:outline-none"
          >
            <X size={15} strokeWidth={2} />
          </button>
        </div>
        <iframe src={fileUri} title="Acknowledgement preview" className="flex-1 w-full border-0" />
        <div className="flex justify-end px-5 py-3 border-t border-brandNeutral-100 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="h-9 px-4 rounded-xl border border-brandNeutral-200 bg-white text-[13px] font-medium text-brandNeutral-600 hover:bg-brandNeutral-50 transition-colors duration-150 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Editable business information placeholders.
 *
 * Actual business information is not available yet. These values are clearly
 * marked placeholders — replace them with verified business details before launch.
 * Pending items are recorded in PROJECT_STATUS.md ("Known issues").
 */
export const BUSINESS_INFO = {
  /** Company name — verified by user/business. */
  companyName: "Hi-Fi Diagnostic",

  /** Business category — verified by user/business. */
  businessCategory: "Blood testing and pathology laboratory",

  address: {
    label: "Laboratory address",
    value: "TBD — awaiting verified laboratory address",
  },

  phone: {
    label: "Laboratory phone number",
    value: "TBD — awaiting verified laboratory phone number",
  },

  email: {
    label: "Laboratory email address",
    value: "TBD — awaiting verified laboratory email address",
  },

  hours: {
    label: "Working hours",
    value: "TBD — awaiting verified office hours",
  },

  /** Canonical URL placeholders — replace with the real production domain. */
  canonical: {
    label: "Canonical URL",
    value: "https://hi-fi-diagnostic.example/",
  },

  /** Note shown under contact forms — explains the local submission status. */
  contactNote:
    "Enquiry form submission is client-side only — no backend or email service is configured yet. Contact details will be provided once confirmed with the laboratory.",
};

export default BUSINESS_INFO;

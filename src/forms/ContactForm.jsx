import { useRef, useState } from "react";

import { BUSINESS_INFO } from "../data/businessInfo";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GENERAL_SUCCESS =
  "Thank you — your enquiry has been submitted for review. Contact details will be provided once confirmed with the laboratory.";
const APPOINTMENT_SUCCESS =
  "Thank you — your appointment request has been submitted for review. Contact details will be provided once confirmed with the laboratory.";

/**
 * ContactForm — validated, client-side enquiry form (general enquiry and
 * appointment request variants). Shows clear submission status. No backend
 * or email service is configured — the form validates locally and shows a
 * local success status.
 */
export default function ContactForm({ variant = "general" }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const fieldRefs = useRef({});

  const setValue =
    (key) =>
    (event) =>
      setValues((previous) => ({ ...previous, [key]: event.target.value }));

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your full name.";
    if (!values.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!EMAIL_REGEX.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (variant === "general" && !values.message.trim()) {
      next.message = "Please describe your enquiry.";
    }
    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus("error");
      const firstKey = Object.keys(next)[0];
      fieldRefs.current[firstKey]?.focus?.();
      return;
    }

    setStatus("submitting");
    // Client-side submission — a real backend would be wired here later.
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("success");
  };

  const statusMessage =
    status === "submitting"
      ? "Submitting — please wait."
      : status === "success"
        ? variant === "general"
          ? GENERAL_SUCCESS
          : APPOINTMENT_SUCCESS
        : status === "error"
          ? Object.keys(errors).length === 1
            ? "Please check the form fields — 1 field needs attention."
            : `Please check the form fields — ${Object.keys(errors).length} fields need attention.`
          : "";

  return (
    <form
      className="contact-form-card"
      noValidate
      onSubmit={handleSubmit}
      aria-label={
        variant === "general" ? "General enquiry form" : "Appointment form"
      }
    >
      <h3 id="contact-form-heading">
        {variant === "general" ? "Enquiry form" : "Appointment enquiry"}
      </h3>

      <div className="contact-form">
        <div className="form-row">
          <label htmlFor="cf-name">Full name *</label>
          <input
            id="cf-name"
            name="name"
            className="form-input"
            ref={(el) => (fieldRefs.current.name = el)}
            value={values.name}
            onChange={setValue("name")}
            required
          />
          {errors.name && (
            <p className="form-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="cf-email">Email address *</label>
          <input
            id="cf-email"
            name="email"
            className="form-input"
            ref={(el) => (fieldRefs.current.email = el)}
            type="email"
            value={values.email}
            onChange={setValue("email")}
            required
          />
          {errors.email && (
            <p className="form-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="cf-phone">Phone number (optional)</label>
          <input
            id="cf-phone"
            name="phone"
            className="form-input"
            ref={(el) => (fieldRefs.current.phone = el)}
            type="tel"
            value={values.phone}
            onChange={setValue("phone")}
          />
        </div>

        {variant === "general" && (
          <div className="form-row">
            <label htmlFor="cf-message">Describe your enquiry *</label>
            <textarea
              id="cf-message"
              name="message"
              className="form-textarea"
              ref={(el) => (fieldRefs.current.message = el)}
              rows={5}
              value={values.message}
              onChange={setValue("message")}
              required
            />
            {errors.message && (
              <p className="form-error" role="alert">
                {errors.message}
              </p>
            )}
          </div>
        )}

        <div className="form-row">
          <label htmlFor="cf-enquiry-type">Enquiry type</label>
          <select
            id="cf-enquiry-type"
            className="form-select"
            value={variant}
            disabled
          >
            <option value="general">General enquiry</option>
            <option value="appointment">Appointment request</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {variant === "general" ? "Submit Enquiry" : "Request Appointment"}
          </button>
        </div>

        <p
          className={`form-status form-status--${status}`}
          aria-live="polite"
        >
          {statusMessage}
        </p>

        <p className="contact-note">{BUSINESS_INFO.contactNote}</p>
      </div>
    </form>
  );
}

import { Clock, Mail, MapPin, Phone } from "lucide-react";

import ContactForm from "../forms/ContactForm";
import SEO from "../components/SEO";
import { BUSINESS_INFO } from "../data/businessInfo";
import { PAGE_META } from "../data/pageMeta";

const meta = PAGE_META.contact;

export default function Contact() {
  return (
    <main>
      <SEO
        title={meta.title}
        description={meta.description}
        canonical={meta.canonical}
        ogImage={meta.ogImage}
      />

      {/* 1. Contact hero */}
      <section className="hero contact-hero" id="contact-hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-eyebrow">Contact</span>
            <h1>Contact Hi-Fi Diagnostic</h1>
            <p className="hero-subtitle">
              Get in touch with our laboratory team. The enquiry form and
              appointment requests are available below.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Contact information (placeholders) */}
      <section className="section" id="contact-information">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Contact Information</span>
            <h2>Contact Information</h2>
            <p className="section-subtitle">
              Placeholders — contact details to be confirmed with the
              laboratory.
            </p>
          </div>

          <div className="contact-info-grid">
            <article className="contact-info-card">
              <Mail size={22} color="#0756a4" aria-hidden />
              <div>
                <h3>Email</h3>
                <p>{BUSINESS_INFO.email.value}</p>
              </div>
            </article>

            <article className="contact-info-card">
              <Phone size={22} color="#0756a4" aria-hidden />
              <div>
                <h3>Phone</h3>
                <p>{BUSINESS_INFO.phone.value}</p>
              </div>
            </article>

            <article className="contact-info-card">
              <MapPin size={22} color="#0756a4" aria-hidden />
              <div>
                <h3>Address</h3>
                <p>{BUSINESS_INFO.address.value}</p>
              </div>
            </article>

            <article className="contact-info-card">
              <Clock size={22} color="#0756a4" aria-hidden />
              <div>
                <h3>Working hours</h3>
                <p>{BUSINESS_INFO.hours.value}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 3. Enquiry form (validated) */}
      <section className="section" id="enquiry-form">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Enquiry</span>
            <h2>Enquiry Form</h2>
            <p className="section-subtitle">
              Submit your enquiry — validated form.
            </p>
          </div>
          <ContactForm variant="general" />
        </div>
      </section>

      {/* 4. Appointment enquiry */}
      <section className="section" id="appointment-enquiry">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Appointment enquiry</span>
            <h2>Request an Appointment</h2>
            <p className="section-subtitle">
              Use the appointment enquiry form to request an appointment.
            </p>
          </div>
          <ContactForm variant="appointment" />
        </div>
      </section>

      {/* 5. Map placeholder */}
      <section className="section" id="map-placeholder">
        <div className="container">
          <div className="map-placeholder">
            <MapPin size={36} color="#0756a4" aria-hidden />
            <h3>Location map</h3>
            <p>Map placeholder — location details coming soon.</p>
          </div>
        </div>
      </section>
    </main>
  );
}


import SEO from "../components/SEO";
import { PAGE_META } from "../data/pageMeta";
import { approachSteps, values } from "../data/aboutContent";

const meta = PAGE_META.about;

const commitments = [
  "Trained laboratory staff",
  "Careful sample handling",
  "Professional laboratory facilities",
  "Clear customer communication",
];

export default function About() {
  return (
    <main className="about-page">
      <SEO
        title={meta.title}
        description={meta.description}
        canonical={meta.canonical}
        ogImage={meta.ogImage}
      />

      {/* 1. About hero */}
      <section className="hero about-hero" id="about-hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-eyebrow">
              <span className="about-eyebrow-dot" />
              Laboratory Introduction
            </span>

            <h1>
              Better Insights.
              <span> Better Health.</span>
            </h1>

            <p className="hero-subtitle">
              Discover Hi-Fi Diagnostic and our commitment to
              professional blood testing and pathology laboratory
              services.
            </p>

            <a className="btn btn-primary" href="/contact">
              Contact Our Laboratory
            </a>
          </div>

          <div className="about-hero-visual">
            <div className="about-visual-card">
              <div className="about-visual-icon">✚</div>
              <span>Hi-Fi Diagnostic</span>
              <strong>Laboratory Services</strong>
              <p>
                Supporting informed healthcare decisions
                through laboratory testing.
              </p>
              <div className="about-visual-decoration" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Laboratory introduction */}
      <section
        className="section laboratory-introduction"
        id="laboratory-introduction"
      >
        <div className="container">
          <div className="about-intro-grid">
            <div>
              <span className="section-eyebrow">
                Who We Are
              </span>

              <h2>
                About Hi-Fi Diagnostic
              </h2>
            </div>

            <div>
              <p>
                Hi-Fi Diagnostic is a blood testing and pathology
                laboratory. We support customers with laboratory
                services and clear information about our processes.
              </p>

              <p>
                Our focus is on professional service, responsible
                sample handling, and clear communication throughout
                the laboratory process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission and vision */}
      <section
        className="section mission-vision"
        id="mission-vision"
      >
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">
              Our Purpose
            </span>
            <h2>Mission and Vision</h2>
            <p>
              The principles that guide our laboratory services.
            </p>
          </div>

          <div className="mission-vision-grid">
            <article className="card card-body purpose-card">
              <span className="purpose-icon">◎</span>
              <h3>Our Mission</h3>
              <p>
                To provide reliable laboratory services that
                support customers.
              </p>
              <span className="placeholder-note">
                Draft statement — confirm with laboratory
                before publication.
              </span>
            </article>

            <article className="card card-body purpose-card">
              <span className="purpose-icon">◇</span>
              <h3>Our Vision</h3>
              <p>
                To be a laboratory of choice through professional
                service, clear communication and reliable processes.
              </p>
              <span className="placeholder-note">
                Draft statement — confirm with laboratory
                before publication.
              </span>
            </article>
          </div>
        </div>
      </section>

      {/* 4. Values */}
      <section
        className="section values-section"
        id="values"
      >
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">
              What Guides Us
            </span>
            <h2>Our Values</h2>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <article
                key={value.id}
                className="card card-body value-card"
              >
                <span className="value-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Quality commitment */}
      <section
        className="section quality-commitment"
        id="quality-commitment"
      >
        <div className="container">
          <div className="quality-layout">
            <div>
              <span className="section-eyebrow">
                Our Commitment
              </span>

              <h2>
                A Professional Approach to Laboratory Services
              </h2>

              <p>
                Hi-Fi Diagnostic is committed to reliable
                laboratory processes and a professional approach
                to sample handling.
              </p>

              <span className="placeholder-note">
                Confirm operational and quality claims with
                laboratory management before publication.
              </span>
            </div>

            <div className="quality-card card card-body">
              <h3>Our Service Principles</h3>

              <ul className="quality-list">
                {commitments.map((item) => (
                  <li key={item}>
                    <span className="quality-check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Laboratory approach */}
      <section
        className="section laboratory-approach"
        id="laboratory-approach"
      >
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">
              Laboratory Approach
            </span>

            <h2>Understanding the Laboratory Process</h2>

            <p>
              An educational overview of the journey of a
              collected sample through laboratory processes.
            </p>
          </div>

          <div className="approach-grid">
            {approachSteps.map((step, index) => (
              <article
                className="approach-card"
                key={step.id}
              >
                <span className="approach-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>

          <p className="page-note">
            This is an illustrative educational overview, not
            a substitute for laboratory procedures or clinical
            instructions.
          </p>
        </div>
      </section>

      {/* 7. Contact CTA */}
      <section
        className="about-contact-cta"
        id="about-contact-cta"
      >
        <div className="container">
          <span className="hero-eyebrow">
            Have Questions?
          </span>

          <h2>
            Get in Touch with Hi-Fi Diagnostic
          </h2>

          <p>
            Contact our team for information about our
            laboratory services.
          </p>

          <a className="btn btn-primary" href="/contact">
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}

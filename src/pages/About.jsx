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

const laboratoryImages = {
  hero: "/images/about/hero.avif",
  introduction: "/images/about/introduction.avif",
  quality: "/images/about/quality.avif",
  microscope: "/images/about/microscope.avif",
  samples: "/images/about/sample.avif",
};

export default function About() {
  return (
    <main className="about-page">
      <SEO
        title={meta.title}
        description={meta.description}
        canonical={meta.canonical}
        ogImage={meta.ogImage}
      />

      {/* 1. About Hero */}
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
              Discover Hi-Fi Diagnostic and our commitment to professional blood
              testing and pathology laboratory services.
            </p>

            <a className="btn btn-primary" href="/contact">
              Contact Our Laboratory
            </a>
          </div>

          <div className="about-hero-visual">
            <div className="about-hero-image">
              <img
                src={laboratoryImages.hero}
                alt="Professional clinical diagnostic laboratory"
                fetchPriority="high"
              />

              <div className="about-image-overlay">
                <span>Hi-Fi Diagnostic</span>
                <strong>Professional Laboratory Services</strong>
              </div>
            </div>

            {/* <div className="about-floating-card">
              <span className="floating-icon">✚</span>
              <div>
                <strong>Diagnostic Care</strong>
                <p>Supporting informed healthcare decisions</p>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </section>

      {/* 2. Laboratory Introduction */}
      <section
        className="section laboratory-introduction"
        id="laboratory-introduction"
      >
        <div className="container">
          <div className="about-intro-grid">
            <div className="about-intro-image">
              <img
                src={laboratoryImages.introduction}
                alt="Modern laboratory environment"
                loading="lazy"
              />
            </div>

            <div className="about-intro-content">
              <span className="section-eyebrow">Who We Are</span>

              <h2>About Hi-Fi Diagnostic</h2>

              <p>
                Hi-Fi Diagnostic is a blood testing and pathology laboratory. We
                support customers with laboratory services and clear information
                about our processes.
              </p>

              <p>
                Our focus is on professional service, responsible sample
                handling, and clear communication throughout the laboratory
                process.
              </p>

              <a href="/contact" className="text-link">
                Learn More About Our Services →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission and Vision */}
      <section className="section mission-vision" id="mission-vision">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Our Purpose</span>

            <h2>Mission and Vision</h2>

            <p>The principles that guide our laboratory services.</p>
          </div>

          <div className="mission-vision-grid">
            <article className="card card-body purpose-card">
              <span className="purpose-icon">◎</span>

              <h3>Our Mission</h3>

              <p>
                To provide reliable laboratory services that support customers
                through professional processes and clear communication.
              </p>
            </article>

            <article className="card card-body purpose-card">
              <span className="purpose-icon">◇</span>

              <h3>Our Vision</h3>

              <p>
                To be a laboratory of choice through professional service, clear
                communication and reliable processes.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 4. Our Values */}
      <section className="section values-section" id="values">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">What Guides Us</span>

            <h2>Our Values</h2>

            <p>
              The standards and principles behind our approach to laboratory
              services.
            </p>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <article
                key={value.id}
                className="card value-card value-image-card"
              >
                <div className="value-image-wrapper">
                  <img src={value.image} alt={value.imageAlt} loading="lazy" />

                  <span className="value-number">
                    {value.number || String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="card-body value-card-content">
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>

                  <span className="value-card-link">
                    Our Commitment
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Quality Commitment */}
      <section className="section quality-commitment" id="quality-commitment">
        <div className="container">
          <div className="quality-layout">
            <div className="quality-content">
              <span className="section-eyebrow">Our Commitment</span>

              <h2>A Professional Approach to Laboratory Services</h2>

              <p>
                Hi-Fi Diagnostic is committed to reliable laboratory processes
                and a professional approach to sample handling.
              </p>

              <div className="quality-image">
                <img
                  src={laboratoryImages.quality}
                  alt="Medical laboratory professional working with diagnostic samples"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="quality-card card card-body">
              <span className="section-eyebrow">Quality Standards</span>

              <h3>Our Service Principles</h3>

              <ul className="quality-list">
                {commitments.map((item) => (
                  <li key={item}>
                    <span className="quality-check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <img
                className="quality-detail-image"
                src={laboratoryImages.samples}
                alt="Organized laboratory sample collection tubes"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Laboratory Approach */}
      <section className="section laboratory-approach" id="laboratory-approach">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Laboratory Approach</span>

            <h2>Understanding the Laboratory Process</h2>

            <p>
              An educational overview of the journey of a collected sample
              through laboratory processes.
            </p>
          </div>

          <div className="approach-feature-image">
            <img
              src={laboratoryImages.microscope}
              alt="Microscope used in laboratory sample analysis"
              loading="lazy"
            />
          </div>

          <div className="approach-grid">
            {approachSteps.map((step) => (
              <article className="approach-card" key={step.id}>
                <div className="approach-card-image">
                  <img src={step.image} alt={step.imageAlt} loading="lazy" />
                </div>

                <div className="approach-card-content">
                  <span className="approach-number">{step.number}</span>

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>

          <p className="page-note">
            This is an illustrative educational overview, not a substitute for
            laboratory procedures or clinical instructions.
          </p>
        </div>
      </section>

      {/* 7. Contact CTA */}
      <section className="about-contact-cta" id="about-contact-cta">
        <div className="container">
          <span className="hero-eyebrow">Have Questions?</span>

          <h2>Get in Touch with Hi-Fi Diagnostic</h2>

          <p>Contact our team for information about our laboratory services.</p>

          <a className="btn btn-primary" href="/contact">
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}

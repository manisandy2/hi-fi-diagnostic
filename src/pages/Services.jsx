import SEO from "../components/SEO";
import { PAGE_META } from "../data/pageMeta";

const meta = PAGE_META.services;

const placeholderCategories = [
  { id: 1, title: "Category 1 (placeholder)" },
  { id: 2, title: "Category 2 (placeholder)" },
  { id: 3, title: "Category 3 (placeholder)" },
  { id: 4, title: "Category 4 (placeholder)" },
];

const placeholderServices = [
  { id: 1, title: "Service 1 (placeholder)" },
  { id: 2, title: "Service 2 (placeholder)" },
];

export default function Services() {
  return (
    <main>
      <SEO
        title={meta.title}
        description={meta.description}
        canonical={meta.canonical}
        ogImage={meta.ogImage}
      />

      {/* 1. Services hero */}
      <section className="hero services-hero" id="services-hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-eyebrow">Diagnostic Services</span>
            <h1>Diagnostic Services</h1>
            <p className="hero-subtitle">
              Professional laboratory testing services — category details
              being confirmed with the laboratory. Placeholder.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Diagnostic testing categories (placeholders) */}
      <section className="section service-categories" id="service-categories">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Diagnostic Testing Categories</span>
            <h2>Diagnostic Testing Categories</h2>
            <p className="section-subtitle">
              The complete list of testing categories will be confirmed with
              the laboratory. Placeholder — not confirmed by the laboratory.
            </p>
          </div>

          <div className="service-category-grid">
            {placeholderCategories.map((category) => (
              <article key={category.id} className="service-placeholder-card">
                <span className="service-placeholder-card-label">
                  Placeholder category
                </span>
                <h3>{category.title}</h3>
                <p>
                  Diagnostic testing categories are being confirmed with the
                  laboratory. Contact us for details.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Individual service cards (placeholders) */}
      <section className="section service-cards" id="service-cards">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Individual Services</span>
            <h2>Individual Service Cards</h2>
            <p className="section-subtitle">
              Service details will be published once the laboratory confirms
              its offering. Placeholder — not confirmed by the laboratory.
            </p>
          </div>

          <div className="service-category-grid">
            {placeholderServices.map((service) => (
              <article key={service.id} className="service-placeholder-card">
                <span className="service-placeholder-card-label">
                  Placeholder service
                </span>
                <h3>{service.title}</h3>
                <p>
                  Individual service details are awaiting laboratory
                  confirmation. Contact us for details.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Sample collection information */}
      <section className="section sample-collection-info" id="sample-collection-information">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Sample Collection</span>
            <h2>Sample Collection Information</h2>
            <p className="section-subtitle">
              General information about the collection process.
            </p>
          </div>

          <p>
            Blood sample collection is the first step in the laboratory
            process. Our website provides general information about laboratory
            collection practices. Specific requirements will be confirmed with
            the laboratory before being presented as actual procedures.
          </p>

          <div className="sample-collection-steps">
            <div className="sample-collection-step">
              <span className="sample-collection-step-number">1</span>
              <div>
                <h3>Prepare</h3>
                <p>
                  Contact the laboratory for general collection information.
                  Placeholder — confirm with laboratory.
                </p>
              </div>
            </div>

            <div className="sample-collection-step">
              <span className="sample-collection-step-number">2</span>
              <div>
                <h3>Visit</h3>
                <p>
                  Visit the collection site — details to be confirmed with the
                  laboratory. Placeholder.
                </p>
              </div>
            </div>

            <div className="sample-collection-step">
              <span className="sample-collection-step-number">3</span>
              <div>
                <h3>Collect</h3>
                <p>
                  Laboratory staff follow standard laboratory procedures for
                  sample collection. General information only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Test enquiry CTA */}
      <section className="test-enquiry-cta" id="test-enquiry">
        <div className="container">
          <h2>Request a Service Enquiry</h2>
          <p>
            Contact the laboratory with your enquiry. Available contact
            options are listed on the Contact page.
          </p>
          <a className="btn btn-primary" href="/contact">
            Request Enquiry
          </a>
        </div>
      </section>

      {/* 6. Contact section */}
      <section className="contact-section" id="services-contact">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Contact</span>
            <h2>Contact</h2>
            <p className="section-subtitle">
              Contact details are available on the Contact page.
            </p>
          </div>
          <a className="btn btn-primary" href="/contact">
            Go to Contact page
          </a>
          <p className="page-note">
            Contact information will be confirmed with the laboratory.
            Placeholder.
          </p>
        </div>
      </section>
    </main>
  );
}

import SEO from "../components/SEO";
import { PAGE_META } from "../data/pageMeta";

const meta = PAGE_META.facilities;

export default function Facilities() {
  return (
    <main>
      <SEO
        title={meta.title}
        description={meta.description}
        canonical={meta.canonical}
        ogImage={meta.ogImage}
      />

      {/* 1. Facilities hero */}
      <section className="hero facilities-hero" id="facilities-hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-eyebrow">Laboratory Facilities</span>
            <h1>Laboratory Facilities</h1>
            <p className="hero-subtitle">
              Preview of our laboratory environment and processing areas.
              Details to be confirmed with the laboratory.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Laboratory environment */}
      <section className="section" id="laboratory-environment">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Laboratory Environment</span>
            <h2>Laboratory Environment</h2>
            <p className="section-subtitle">
              Professional laboratory environment — details to be confirmed
              with the laboratory. Placeholder.
            </p>
          </div>

          <div className="facilities-grid">
            <article className="card card-body">
              <span className="section-eyebrow">Laboratory environment</span>
              <h3>Clinical Laboratory Environment</h3>
              <p>
                Professional laboratory environment with clear, calm spaces —
                illustrative.
              </p>
            </article>

            <article className="card card-body">
              <span className="section-eyebrow">Laboratory controls</span>
              <h3>Laboratory Controls</h3>
              <p>
                Professional environment supporting careful sample handling —
                illustrative.
              </p>
            </article>

            <article className="card card-body">
              <span className="section-eyebrow">Laboratory processes</span>
              <h3>Laboratory Processes</h3>
              <p>
                Process overview — details to be confirmed with the laboratory.
                Placeholder.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 3. Equipment presentation (illustrative only) */}
      <section className="section" id="equipment-presentation">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Equipment Presentation</span>
            <h2>Equipment Presentation</h2>
            <p className="section-subtitle">
              Illustrative equipment only — actual laboratory equipment to be
              confirmed with the laboratory. Placeholder.
            </p>
          </div>

          <div className="facilities-grid">
            <article className="equipment-card">
              <h3>Collection station (illustrative)</h3>
              <p>
                Illustrative display — not an installed laboratory equipment
                list. Placeholder.
              </p>
              <span className="equipment-card-note">Illustrative</span>
            </article>

            <article className="equipment-card">
              <h3>Sample processing area (illustrative)</h3>
              <p>
                Illustrative display — not an installed laboratory equipment
                list. Placeholder.
              </p>
              <span className="equipment-card-note">Illustrative</span>
            </article>

            <article className="equipment-card">
              <h3>Storage area (illustrative)</h3>
              <p>
                Illustrative display — not an installed laboratory equipment
                list. Placeholder.
              </p>
              <span className="equipment-card-note">Illustrative</span>
            </article>
          </div>
        </div>
      </section>

      {/* 4. Sample processing overview */}
      <section className="section" id="sample-processing">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Sample Processing</span>
            <h2>Sample Processing Overview</h2>
            <p className="section-subtitle">
              General process overview — confirm details with the laboratory.
            </p>
          </div>

          <div className="sample-processing-steps">
            <div className="sample-processing-step">
              <span className="sample-processing-step-number">1</span>
              <div>
                <h3>Receipt</h3>
                <p>
                  Sample is received by laboratory staff — general process.
                  Placeholder.
                </p>
              </div>
            </div>

            <div className="sample-processing-step">
              <span className="sample-processing-step-number">2</span>
              <div>
                <h3>Processing</h3>
                <p>
                  Standard laboratory procedures are followed — general
                  process. Placeholder.
                </p>
              </div>
            </div>

            <div className="sample-processing-step">
              <span className="sample-processing-step-number">3</span>
              <div>
                <h3>Results</h3>
                <p>
                  Results are available through available contact options —
                  general process. Placeholder.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Quality and safety */}
      <section className="section" id="quality-safety">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Quality and Safety</span>
            <h2>Quality and Safety</h2>
            <p className="section-subtitle">
              Professional approach to sample handling — details to be
              confirmed with the laboratory.
            </p>
          </div>

          <div className="card card-body">
            <p>
              Hi-Fi Diagnostic applies professional laboratory standards to
              sample handling. Specific requirements — such as storage
              conditions and handling procedures — must be confirmed with the
              laboratory before being presented as actual procedures.
              Placeholder.
            </p>
            <ul>
              <li>Professional laboratory processes</li>
              <li>Quality-focused sample handling</li>
              <li>Safety-conscious environment</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Gallery (illustrative) */}
      <section className="section" id="gallery">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Facility Gallery</span>
            <h2>Gallery</h2>
            <p className="section-subtitle">
              Illustrative facility views — details to be confirmed with the
              laboratory.
            </p>
          </div>

          <div className="gallery-grid">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <article key={n} className="gallery-item">
                <h3>Facility view {n} (illustrative)</h3>
                <p>Illustrative — not an actual laboratory facility. Placeholder.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Contact CTA */}
      <section className="facilities-cta" id="facilities-contact">
        <div className="container">
          <span className="hero-eyebrow">Contact</span>
          <h2>Ready to Learn More?</h2>
          <p>
            Get in touch with Hi-Fi Diagnostic for enquiries about our
            laboratory facilities.
          </p>
          <a className="btn btn-primary" href="/contact">
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}

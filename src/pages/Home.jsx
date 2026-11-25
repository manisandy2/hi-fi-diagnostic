
import {
  ArrowRight,
  ArrowUpRight,
  Microscope,
  ShieldCheck,
  Clock3,
  HeartPulse,
  FlaskConical,
  TestTube2,
  Activity,
  Building2,
  ClipboardCheck,
  Phone,
  CheckCircle2,
  MoveRight,
} from "lucide-react";

import { PAGE_META } from "../data/pageMeta";
import ScrollVideoExperience from "../components/scroll/ScrollVideoExperience";

import "../styles/home.css";

const meta = PAGE_META.home;

const services = [
  {
    number: "01",
    icon: TestTube2,
    title: "Blood Testing",
    description:
      "Laboratory testing services with careful sample handling and professional processing.",
    link: "/services",
  },
  {
    number: "02",
    icon: Microscope,
    title: "Clinical Pathology",
    description:
      "Diagnostic laboratory processes supported by modern facilities and equipment.",
    link: "/services",
  },
  {
    number: "03",
    icon: Activity,
    title: "Diagnostic Services",
    description:
      "Explore our diagnostic services and available testing options.",
    link: "/services",
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Careful Sample Handling",
    description:
      "A structured approach to sample collection, handling and processing.",
  },
  {
    icon: Microscope,
    title: "Modern Facilities",
    description:
      "A professional laboratory environment with diagnostic equipment.",
  },
  {
    icon: ClipboardCheck,
    title: "Clear Processes",
    description:
      "Transparent information about laboratory procedures and services.",
  },
  {
    icon: HeartPulse,
    title: "Patient Focus",
    description:
      "Convenient communication and enquiry options for patients.",
  },
];

const facilities = [
  {
    title: "Clinical Laboratory",
    description: "A professional diagnostic laboratory environment.",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Sample Processing",
    description: "Dedicated areas for careful sample processing.",
    image:
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Laboratory Equipment",
    description: "Modern laboratory equipment and workspaces.",
    image:
      "https://images.unsplash.com/photo-1581093458791-9d15482442f8?auto=format&fit=crop&w=900&q=85",
  },
];

export default function Home() {
  return (
    <main className="home-page">
      {/* 01. Interactive blood collection experience */}
      <ScrollVideoExperience />

      {/* 02. Company introduction */}
      <section className="home-intro section" id="company-introduction">
        <div className="container">
          <div className="home-intro-grid">
            <div className="home-intro-content">
              <span className="home-eyebrow">
                <span className="home-eyebrow-dot" />
                ABOUT HI-FI DIAGNOSTIC
              </span>

              <h2>
                Diagnostics built around
                <span> precision and care.</span>
              </h2>

              <p>
                Hi-Fi Diagnostic is focused on providing professional
                diagnostic laboratory services through organized processes,
                modern facilities and patient-focused communication.
              </p>

              <a href="/about" className="home-link">
                Discover our laboratory
                <ArrowUpRight size={18} />
              </a>
            </div>

            <div className="home-intro-visual">
              <div className="home-intro-image">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1100&q=85"
                  alt="Medical professional working in a diagnostic environment"
                  loading="lazy"
                />
              </div>

              <div className="home-intro-badge">
                <Microscope size={27} />
                <div>
                  <strong>Modern Laboratory</strong>
                  <span>Professional environment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Services */}
      <section
        className="home-services section"
        id="services-overview"
      >
        <div className="container">
          <div className="home-section-heading">
            <div>
              <span className="home-eyebrow">
                WHAT WE OFFER
              </span>
              <h2>Our Diagnostic Services</h2>
              <p>
                Explore our laboratory services and diagnostic testing
                options.
              </p>
            </div>

            <a href="/services" className="home-outline-link">
              All Services
              <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="home-service-grid">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article className="home-service-card" key={service.number}>
                  <div className="home-service-top">
                    <span>{service.number}</span>
                    <div className="home-service-icon">
                      <Icon size={25} />
                    </div>
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <a href={service.link} aria-label={`Explore ${service.title}`}>
                    Explore service
                    <ArrowUpRight size={17} />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 04. Why choose us */}
      <section className="home-why section" id="why-choose">
        <div className="container">
          <div className="home-why-heading">
            <span className="home-eyebrow">
              THE HI-FI APPROACH
            </span>

            <h2>
              A thoughtful approach to
              <span> diagnostic services.</span>
            </h2>

            <p>
              We focus on professional processes, a suitable laboratory
              environment and convenient patient communication.
            </p>
          </div>

          <div className="home-feature-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <article className="home-feature" key={feature.title}>
                  <div className="home-feature-icon">
                    <Icon size={25} />
                  </div>

                  <span className="home-feature-number">
                    0{index + 1}
                  </span>

                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 05. Facilities */}
      <section
        className="home-facilities section"
        id="facilities-preview"
      >
        <div className="container">
          <div className="home-section-heading">
            <div>
              <span className="home-eyebrow">
                OUR ENVIRONMENT
              </span>

              <h2>Explore Our Facilities</h2>

              <p>
                Discover the environment and spaces supporting our
                laboratory processes.
              </p>
            </div>

            <a href="/facilities" className="home-outline-link">
              View Facilities
              <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="home-facility-grid">
            {facilities.map((facility, index) => (
              <article
                className="home-facility-card"
                key={facility.title}
              >
                <div className="home-facility-image">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    loading="lazy"
                  />

                  <span>0{index + 1}</span>
                </div>

                <div className="home-facility-content">
                  <h3>{facility.title}</h3>
                  <p>{facility.description}</p>

                  <a href="/facilities" aria-label={`View ${facility.title}`}>
                    <ArrowUpRight size={20} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 06. Appointment CTA */}
      <section className="home-cta" id="appointment-cta">
        <div className="container">
          <div className="home-cta-content">
            <div>
              <span className="home-cta-eyebrow">
                WE ARE HERE TO HELP
              </span>

              <h2>
                Your next step towards
                <br />
                better health starts here.
              </h2>

              <p>
                Have questions about our diagnostic services?
                Contact our team for assistance and appointment enquiries.
              </p>
            </div>

            <div className="home-cta-actions">
              <a href="/contact" className="home-cta-button">
                Contact Us
                <ArrowRight size={19} />
              </a>

              <span>
                <CheckCircle2 size={16} />
                Easy enquiry process
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

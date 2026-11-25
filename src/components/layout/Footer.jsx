import { Link } from "react-router-dom";
import { footerNavigation } from "../../data/navigation";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <h2>Hi-Fi Diagnostic</h2>
          <p>Professional blood testing and pathology laboratory services.</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          {footerNavigation.map((item) => (
            <Link key={item.path} to={item.path}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="footer-topics">
          <h3>Contact</h3>
          <Link to="/contact">Contact information</Link>
          <Link to="/contact">Request an appointment</Link>
        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} Hi-Fi Diagnostic. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

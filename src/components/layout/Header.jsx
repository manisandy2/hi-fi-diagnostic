import { NavLink } from "react-router-dom";
import { mainNavigation } from "../../data/navigation";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-container">
        <NavLink to="/" className="site-logo">
          Hi-Fi Diagnostic
        </NavLink>

        <nav className="main-navigation" aria-label="Main navigation">
          {mainNavigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

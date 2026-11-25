/** SEO meta data per page. Canonical URLs are placeholders — replace with the real domain before launch. */
import { BUSINESS_INFO } from "./businessInfo";

const canonical = (path) => {
  const base = BUSINESS_INFO.canonical.value.replace(/\/+$/, "");
  return `${base}${path}`;
};

export const PAGE_META = {
  home: {
    title: "Home — Hi-Fi Diagnostic",
    description:
      "Hi-Fi Diagnostic — blood testing and pathology laboratory website with an interactive 3D educational blood collection workflow. Premium medical services with online enquiry and appointment options.",
    canonical: canonical("/"),
    ogImage: "/images/og/home.svg",
  },
  about: {
    title: "About Us — Hi-Fi Diagnostic",
    description:
      "About Hi-Fi Diagnostic — learn more about our laboratory, mission and vision, values and laboratory approach. Placeholder content — confirm with laboratory.",
    canonical: canonical("/about"),
    ogImage: "/images/og/about.svg",
  },
  services: {
    title: "Services — Hi-Fi Diagnostic",
    description:
      "Diagnostic services — laboratory testing categories and service enquiries for Hi-Fi Diagnostic. Placeholders pending laboratory confirmation.",
    canonical: canonical("/services"),
    ogImage: "/images/og/services.svg",
  },
  facilities: {
    title: "Facilities — Hi-Fi Diagnostic",
    description:
      "Laboratory facilities — laboratory environment and processing areas preview for Hi-Fi Diagnostic. Illustrative and placeholder details.",
    canonical: canonical("/facilities"),
    ogImage: "/images/og/facilities.svg",
  },
  contact: {
    title: "Contact — Hi-Fi Diagnostic",
    description:
      "Contact Hi-Fi Diagnostic — contact information, enquiry form and appointment enquiry. Placeholders awaiting laboratory details.",
    canonical: canonical("/contact"),
    ogImage: "/images/og/contact.svg",
  },
};

/**
 * CENTRAL PROFILE CONFIGURATION
 * 
 * Edit this file to update your name, title, bio, and other personal details.
 * All components read from here — no scattered hardcoded strings.
 */

export const profile = {
  name: "Harpreet Singh",
  firstName: "Harpreet",
  lastName: "Singh",
  initials: "HS",
  title: "Full-Stack Software Engineer | Applied AI | RAG & Computer Vision",
  tagline: "Building intelligent products at the intersection of software engineering and AI.",
  location: "Open to opportunities in India, Canada, the UK & remote",
  yearsExperience: "8+",
  aiFocusYears: "3",
  email: "harpreetsingh6051@gmail.com",
  resumePath: "/resume/Harpreet_Singh_AI_Engineer_Resume.pdf",
} as const;

export const socialLinks = {
  github: "https://github.com/HarpreetSingh6051",
  linkedin: "https://www.linkedin.com/in/harpreet-singh-dev",
  email: "mailto:harpreetsingh6051@gmail.com",
} as const;

export const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
] as const;

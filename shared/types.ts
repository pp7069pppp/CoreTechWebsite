// Shared types for the CMS content

export interface Hero {
  heading: string;
  subheading: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface About {
  title: string;
  description1: string;
  description2: string;
  stats: Stat[];
  imageUrl: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  projectUrl: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  socialLinks: {
    type: 'linkedin' | 'twitter' | 'github' | 'dribbble';
    url: string;
  }[];
}

export interface Testimonial {
  id: number;
  content: string;
  authorName: string;
  authorRole: string;
  authorImageUrl: string;
}

export interface ServiceItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  socialLinks: {
    type: string;
    url: string;
  }[];
}

export interface SiteContent {
  hero: Hero;
  about: About;
  services: ServiceItem[];
  portfolioItems: PortfolioItem[];
  teamMembers: TeamMember[];
  testimonials: Testimonial[];
  contactInfo: ContactInfo;
}
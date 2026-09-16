export interface Project {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  techStack: string[];
  achievements: { label: string; value: string }[];
  features: string[];
  github?: string;
  live?: string;
  category: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  dateRange: string;
  location: string;
  category: string;
  description: string;
  achievements: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  badgeText: string;
  credentialUrl?: string;
}

export interface SkillItem {
  name: string;
  mastery: number;
  description: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  items: SkillItem[];
}

export interface Education {
  institution: string;
  degree: string;
  dateRange: string;
  location: string;
  grade: string;
  details: string;
}

import fs from "fs";
import path from "path";

export interface HeroSlide {
  src: string;
  alt: string;
  href: string;
  label: string;
}

export interface Work {
  id: number;
  slug: string;
  title: string;
  year: string;
  href: string;
  cover: string;
  bg: string;
  location: string;
  type: string;
  size: string;
  desc: string;
}

export interface DesignSlide {
  src: string;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  cover: string;
  location: string;
  type: string;
  size: string;
  condition: string;
  description: string[];
  designSlides: DesignSlide[];
  floorPlan: { src: string; caption: string };
  photos: string[];
}

export interface Contact {
  email: string;
  instagram: string;
  instagramHandle: string;
  address: string;
  hours: string;
  responseTime: string;
  serviceArea: string;
  services: string[];
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(
    fs.readFileSync(path.join(process.cwd(), relativePath), "utf-8")
  ) as T;
}

export function writeJson(relativePath: string, data: unknown): void {
  fs.writeFileSync(
    path.join(process.cwd(), relativePath),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

export interface Layout {
  interiorCardGap: number;
}

export const getHeroSlides = () => readJson<HeroSlide[]>("data/hero-slides.json");
export const getWorks = () => readJson<Work[]>("data/works.json");
export const getProject = (slug: string) => readJson<Project>(`data/projects/${slug}.json`);
export const getContact = () => readJson<Contact>("data/contact.json");
export const getLayout = (): Layout => {
  try {
    return readJson<Layout>("data/layout.json");
  } catch {
    return { interiorCardGap: 40 };
  }
};

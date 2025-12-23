export type Slide = { title?: string; text?: string; image?: string };
import type { LucideIcon } from "lucide-react";

export type Product = {
  id: string;
  name: string;
  subtitle?: string;
  code?: string;
  image?: string;
};

export type Catalog = {
  id: string;
  title: string;
  file?: string;
  href?: string;
};

export type Brand = {
  id: string;
  name: string;
  image?: string;
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
};

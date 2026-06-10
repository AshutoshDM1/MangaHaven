import { IconType } from "react-icons";
import { FaSquareXTwitter, FaDiscord , FaGithub} from "react-icons/fa6";

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: IconType;
  href: string;
  label: string;
}

export interface Creator {
  name: string;
  githubUrl: string;
}

export const QUICK_LINKS: FooterLink[] = [
  { label: "Home", href: "/dasboard" },
  { label: "Browse Manga", href: "/dashboard/search" },
  { label: "Comedy", href: "dashboard/search?genre=Comedy" },
  { label: "Action", href: "dashboard/search?genre=Action" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { icon: FaSquareXTwitter, href: "https://x.com/AshutoshDM_1", label: "Twitter" },
  { icon: FaDiscord, href: "https://discord.gg/ddC3gejWPg", label: "Discord" },
  { icon: FaGithub, href: "https://github.com/AshutoshDM1/MangaHaven", label: "Github" },
];

export const CREATORS: Creator[] = [
  { name: "shailesh", githubUrl: "https://github.com/ShaileshIshere" },
  { name: "shivam", githubUrl: "https://github.com/ShivamIT23" },
  { name: "Ashutosh", githubUrl: "https://github.com/AshutoshDM1" },
];

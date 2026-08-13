import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiVite,
  SiMysql,
  SiFirebase,
  SiGrafana,
  SiPrometheus,
  SiElasticsearch,
  SiCoreldraw,
  SiPhp,
  SiPython,
  SiGit,
  SiGithub,
  SiNodedotjs,
  SiDocker,
  SiLinux,
  SiFigma,
} from "react-icons/si";
import { TbBrandAdobePhotoshop, TbBrandCSharp, TbSql } from "react-icons/tb";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import javaLogo from "../assets/icons/java-vector.svg";
import gitLogo from "../assets/icons/git-official.svg";
import githubLogo from "../assets/icons/github-si.svg";
import jgraspLogo from "../assets/icons/jgrasp-ios.png";
import nodeLogo from "../assets/icons/nodejs-official.svg";
import dockerLogo from "../assets/icons/docker-official.svg";
import linuxLogo from "../assets/icons/linux-official.svg";
import figmaLogo from "../assets/icons/figma-logo.png";

function CanvaMark({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.5c-5.2 0-9.5 3.8-9.5 9.3 0 3.4 1.8 6.3 4.6 7.9.3.2.4 0 .3-.2-.2-1-.3-1.8-.1-2.7.1-.5.7-2.9.7-2.9s-.2-.4-.2-1c0-1 .6-1.7 1.3-1.7.6 0 .9.5.9 1 0 .6-.4 1.6-.6 2.4-.2.8.4 1.5 1.2 1.5 1.4 0 2.5-1.5 2.5-3.7 0-1.9-1.4-3.3-3.4-3.3-2.3 0-3.7 1.7-3.7 3.5 0 .7.3 1.4.6 1.8.1.1.1.2 0 .3l-.2.8c0 .1-.1.2-.3.1-1.1-.5-1.8-1.9-1.8-3.2 0-2.6 1.9-5 5.5-5 2.9 0 5.1 2.1 5.1 4.8 0 2.9-1.8 5.2-4.4 5.2-.9 0-1.7-.4-2-.9l-.5 2.1c-.2.8-.7 1.8-1.1 2.4 1 .3 2 .5 3.1.5 5.2 0 9.5-3.8 9.5-9.3S17.2 2.5 12 2.5z" />
    </svg>
  );
}

function JGraspMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <rect x="2" y="2" width="60" height="60" rx="4" fill="#1a5fb4" />
      <rect x="8" y="8" width="48" height="48" fill="#000" />
      <rect x="12" y="12" width="40" height="40" fill="#2f7de0" />
      <text
        x="32"
        y="44"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="34"
        fontWeight="700"
        fill="#000"
      >
        G
      </text>
    </svg>
  );
}

const map = {
  html5: SiHtml5,
  css3: SiCss,
  javascript: SiJavascript,
  react: SiReact,
  vite: SiVite,
  mysql: SiMysql,
  firebase: SiFirebase,
  grafana: SiGrafana,
  prometheus: SiPrometheus,
  elasticsearch: SiElasticsearch,
  photoshop: TbBrandAdobePhotoshop,
  canva: CanvaMark,
  corel: SiCoreldraw,
  php: SiPhp,
  csharp: TbBrandCSharp,
  java: SiJavascript,
  python: SiPython,
  git: SiGit,
  github: SiGithub,
  sqlserver: TbSql,
  jgrasp: JGraspMark,
  nodejs: SiNodedotjs,
  docker: SiDocker,
  linux: SiLinux,
  figma: SiFigma,
};

const images = {
  java: javaLogo,
  git: gitLogo,
  github: githubLogo,
  jgrasp: jgraspLogo,
  nodejs: nodeLogo,
  docker: dockerLogo,
  linux: linuxLogo,
  figma: figmaLogo,
};

export default function TechIcon({ name, size = 28, image }) {
  if (image && images[image]) {
    return (
      <img
        src={images[image]}
        alt=""
        width={size}
        height={size}
        className="tech-icon-3d"
        aria-hidden
      />
    );
  }

  const Icon = map[name] || HiOutlinePaintBrush;
  return <Icon size={size} aria-hidden />;
}

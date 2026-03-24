"use client";
import React from "react";
import { ChartNoAxesGantt, CodeXml, Rocket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GapPattern } from "./gap-pattern";

export const basePath = [
  {
    href: "/docs/getting-started",
    name: "Getting Started",
    icon: <Rocket />,
    tags: ["get-started", "get started", "get-started", "get started"],
  },
  {
    href: "/docs/how-it-works",
    name: "How It Works",
    icon: <ChartNoAxesGantt />,
    tags: ["how-it-works", "how it works", "how-it-works", "how it works"],
  },
  {
    href: "/docs/skip-classes",
    name: "Skip Classes",
    icon: <CodeXml />,
    tags: ["skip-classes", "skip classes", "skip-classes", "skip classes"],
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="xl:w-48 lg:w-44 w-40 shrink-0 lg:block hidden relative">
      <nav className="sticky top-20 space-y-2 pl-2">
        <ul className="pb-1 pt-6">
          {basePath?.map((link, index) => (
            <li key={`id-${index}`}>
              <Link
                href={link.href}
                className={`flex gap-2 lg:text-base text-sm group font-normal items-center py-1 transition-all ${
                  link.href === pathname
                    ? "active-nav"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {React.cloneElement(link?.icon, {
                  className: `${
                    link.href === pathname
                      ? "bg-black text-white"
                      : "group-hover:bg-black group-hover:text-white"
                  } h-7 w-7 border transition-all rounded-md p-1`,
                })}
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <GapPattern className="2xl:w-10 lg:w-7 w-5 h-full border-x border-y-0 absolute -right-4 top-0" />
    </aside>
  );
};

export default Sidebar;

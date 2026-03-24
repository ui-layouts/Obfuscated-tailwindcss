import {
  AppWindowMac,
  LayoutPanelTop,
  MousePointerClick,
  Rocket,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  DirectionalDrawer,
  DrawerContent,
} from "@/components/ui/directional-drawer";
import { basePath } from "./sidebar";
import { cn } from "@/lib/utils";

function MobileHeader({ classname }: { classname?: string }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <button
        className={cn(classname, "text-3xl cursor-pointer")}
        onClick={() => setSidebarOpen(true)}
      >
        {/* <HiOutlineMenuAlt2 /> */}
        <svg
          width="642"
          height="421"
          viewBox="0 0 642 421"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=" stroke-primary w-9 h-9"
        >
          <path
            d="M52.333 359H252.333"
            strokeWidth="66.6667"
            strokeLinecap="round"
          />
          <path
            d="M52.333 212H452.333"
            strokeWidth="66.6667"
            strokeLinecap="round"
          />
          <path
            d="M52.333 65H585.666"
            strokeWidth="66.6667"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <DirectionalDrawer
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        direction={"left"}
        outsideClose={true}
        className="sm:w-80 w-[70%] p-4 h-screen z-999"
      >
        <DrawerContent>
          <figure className="flex justify-between w-full items-center">
            <Link
              href="/"
              className="flex gap-2 items-center text-2xl font-semibold border-b  py-2"
            >
              <svg
                width="107"
                height="115"
                className="w-8 h-8 mx-auto"
                viewBox="0 0 107 115"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M35.5 35.5C16.5667 35.5 4.73333 44.9444 0 63.8333C7.1 54.3889 15.3833 50.8472 24.85 53.2083C30.2513 54.5568 34.1116 58.4657 38.3847 62.7918C45.3453 69.8411 53.4025 78 71 78C89.9333 78 101.767 68.5556 106.5 49.6667C99.4 59.1111 91.1167 62.6528 81.65 60.2917C76.2487 58.9458 72.3884 55.0343 68.1153 50.7082C61.1547 43.6589 53.0975 35.5 35.5 35.5Z"
                  fill="#38BDF8"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M80.21 50.4811C88.4673 33.4433 85.1291 18.6757 70.1956 6.17832C75.598 16.6865 75.1726 25.6851 68.9192 33.1743C65.3501 37.4467 60.149 39.2158 54.3924 41.1744C45.0131 44.3639 34.1571 48.0561 26.4824 63.8918C18.2251 80.9297 21.5633 95.6973 36.4968 108.195C31.0944 97.6865 31.5198 88.6879 37.7732 81.1987C41.3399 76.9251 46.5434 75.1572 52.3 73.1986C61.6792 70.0091 72.5353 66.3169 80.21 50.4811Z"
                  fill="#38BDF8"
                />
              </svg>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                ObfusTail
              </span>
            </Link>

            <button
              className="md:hidden flex"
              onClick={() => setSidebarOpen(false)}
            >
              <X />
            </button>
          </figure>
          {/* <GitHubButton /> */}

          <ScrollArea className="h-[95vh] py-4 pb-12">
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
            <a
              href="https://discord.gg/4bySmj75"
              target="_blank"
              className="pb-2 flex gap-2 items-center"
            >
              <span className="w-6 h-6 p-1 bg-black/20 border dark:border-white/10 border-black/10 dark:bg-white/20 fill-primary rounded-md ">
                <svg
                  viewBox="0 0 256 199"
                  width="1em"
                  height="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                  className="w-full h-full"
                >
                  <path d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632 108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18Z" />
                </svg>
              </span>
              Discord
            </a>
          </ScrollArea>
        </DrawerContent>
      </DirectionalDrawer>
    </>
  );
}

export default MobileHeader;

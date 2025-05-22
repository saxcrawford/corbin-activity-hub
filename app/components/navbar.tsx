import Link from "next/link";
import React from "react";
import corbinLogo from "../images/corbin-logo.svg";
import Image from "next/image";

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";

type NavbarLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

const NavbarLink = ({
  href,
  children,
  className = "",
}: NavbarLinkProps) => {
  return (
    <Link
      href={href}
      className={`cursor-pointer block text-base md:text-lg lg:text-xl font-semibold text-corbinRed hover:text-corbinRed/50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-corbinRed focus-visible:ring-opacity-75 ${className}`}
    >
      {children}
    </Link>
  );
};

type NavItemType = {
  href: string;
  title: string;
  description: string;
};

type NavbarDropdownProps = {
  title: string;
  items: NavItemType[];
};

const NavbarDropdown = ({ title, items }: NavbarDropdownProps) => {
  return (
    <>
      <div className="navbar-menu content-center m-1 md:m-3">
        <Popover>
          <PopoverButton className={`flex items-center gap-1 cursor-pointer text-base md:text-lg lg:text-xl font-semibold text-corbinRed hover:text-corbinRed/50 transition-colors duration-200 focus:outline-none focus:text-corbinRed/50`}
                         aria-label={`${title} menu`}>
            {title}
            <svg
              className="self-center size-3 md:size-4 transition-transform duration-200"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </PopoverButton>

          <Transition
            enter="transition-opacity duration-300 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <PopoverPanel
              anchor="bottom"
              className="absolute z-10 mt-2 w-64 rounded-lg bg-corbinGray shadow-lg ring-1 ring-black/5 focus:outline-none"
            >
              <div className="p-3 text-corbinBlue">
                {items.map((item, index) => (
                  <a
                    key={index}
                    className="block rounded-lg py-2 px-3 hover:text-lightCorbin hover:bg-corbinBlue transition-colors duration-200"
                    href={item.href}
                  >
                    <p className="font-semibold text-sm md:text-base">{item.title}</p>
                    <p className="text-xs md:text-sm">{item.description}</p>
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Transition>
        </Popover>
      </div>
    </>
  );
};

function Navbar() {
  const exploreItems = [
    {
      href: "/trails",
      title: "Trails",
      description: "Explore the trails of Corbin",
    },
    {
      href: "/weather",
      title: "Check The Weather",
      description: "See what the weather is like",
    },
    {
      href: "/taste_of_corbin",
      title: "Taste of Corbin",
      description: "Explore the local eateries",
    },
  ];

  const planItems = [
    {
      href: "/trip_planning",
      title: "Trip Planner",
      description: "Plan your trip to Corbin",
    },
  ];
  return (
    <nav className="w-full flex flex-row items-center justify-between gap-2 px-4 py-2">
      <div className="mr-auto">
        <Link href="/" aria-label="Home">
          <Image
              src={corbinLogo}
              alt="Corbin Logo"
              width={70}
              height={70}
              priority
              />
        </Link>
      </div>

      <div className="flex flex-row items-center w-auto">
        <div className="content-center m-1 md:m-3">
          <NavbarLink href="../history">History</NavbarLink>
        </div>

        <div className="flex content-center">
          <NavbarDropdown title="Explore" items={exploreItems} />
          <NavbarDropdown title="Plan" items={planItems} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

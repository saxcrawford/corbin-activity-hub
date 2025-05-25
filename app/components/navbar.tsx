"use client"

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
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";

type NavbarLinkProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
};

const NavbarLink = ({
                        href,
                        children,
                        className = "",
                        onClick,
                    }: NavbarLinkProps) => {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`cursor-pointer block font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-corbinRed focus-visible:ring-opacity-75 ${className}`}
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

const NavbarDropdown = ({title, items}: NavbarDropdownProps) => {
    return (
        <div className="relative">
            <Popover>
                {({open}) => (
                    <>
                        <PopoverButton
                            className={`group inline-flex items-center gap-1 py-2 px-2 md:px-3 rounded-md text-base md:text-lg font-semibold text-corbinRed hover:text-corbinRed/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-corbinRed`}
                            aria-label={`${title} menu`}
                        >
                            <span>{title}</span>
                            <svg
                                className={`h-4 w-4 md:h-5 md:w-5 text-corbinRed group-hover:text-corbinRed/70 transition-transform duration-200 ${
                                    open ? "transform rotate-180" : ""
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
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
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <PopoverPanel
                                anchor="bottom"
                                className="absolute z-10 mt-2 w-64 rounded-lg bg-corbinGray border-1 border-corbinGray/50 ring-1 ring-black/50 ring-opacity-5 focus:outline-none"
                            >
                                <div className="p-3 text-corbinBlue">
                                    {items.map((item, index) => (
                                        <a
                                            key={index}
                                            className="block rounded-lg p-3 hover:text-lightCorbin hover:bg-corbinBlue transition-colors duration-150 group"
                                            href={item.href}
                                        >
                                            <p className="text-sm md:text-base font-semibold">{item.title}</p>
                                            <p className="text-xs md:text-sm">{item.description}</p>
                                        </a>
                                    ))}
                                </div>
                            </PopoverPanel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
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
        <nav className="w-full flex items-center justify-between py-3 px-4 sm:px-6 relative z-30">
            <div className="flex-shrink-0">
                <Link href="/" aria-label="Home">
                    <Image
                        src={corbinLogo}
                        alt="Corbin Activity Hub Logo"
                        width={150}
                        height={50}
                        className="h-12 w-auto sm:h-14 md:h-18"
                        priority
                    />
                </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-1 md:space-x-2">
                <NavbarLink href="/history" className="py-2 px-2 md:px-3 text-corbinRed text-base md:text-lg">
                    History
                </NavbarLink>
                <NavbarDropdown title="Explore" items={exploreItems} />
                <NavbarDropdown title="Plan" items={planItems} />
            </div>
            <div className="lg:hidden">
                <Popover>
                    {({ open, close }) => (
                        <>
                            <PopoverButton
                                className="inline-flex items-center justify-center p-2 rounded-md text-corbinRed hover:text-corbinRed/70 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-corbinRed"
                                aria-label="Open main menu"
                            >
                                <span className="sr-only">Open main menu</span>
                                {open ? (
                                    <XMarkIcon className="block h-7 w-7" aria-hidden="true" />
                                ) : (
                                    <Bars3Icon className="block h-7 w-7" aria-hidden="true" />
                                )}
                            </PopoverButton>

                            <Transition
                                enter="duration-200 ease-out"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="duration-100 ease-in"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <PopoverPanel
                                    focus
                                    className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden z-40"
                                >
                                    <div className="rounded-lg shadow-xl bg-corbinGray border-1 border-corbinGray/50 ring-1 ring-black/50 ring-opacity-5 focus:outline-none">
                                        <div className="pt-5 pb-6 px-5">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <Image
                                                        src={corbinLogo}
                                                        alt="Corbin Activity Hub Logo"
                                                        width={120}
                                                        height={40}
                                                        className="h-8 w-auto"
                                                    />
                                                </div>
                                                <div className="-mr-2">
                                                    <PopoverButton
                                                        className="bg-corbinBlue rounded-md p-2 inline-flex items-center justify-center text-lightCorbin focus:outline-none active:outline-none active:ring-2 active:ring-inset active:ring-corbinRed"
                                                        aria-label="Close menu"
                                                    >
                                                        <span className="sr-only">Close menu</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </PopoverButton>
                                                </div>
                                            </div>
                                            <div className="mt-8">
                                                <nav className="grid gap-y-4">
                                                    <NavbarLink href="/history" className="text-lg text-corbinBlue hover:text-lightCorbin hover:bg-corbinBlue p-2 rounded-md py-2" onClick={close}>
                                                        History
                                                    </NavbarLink>
                                                    <div>
                                                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                                            Explore
                                                        </h3>
                                                        <div className="grid gap-y-2 text-corbinBlue">
                                                            {exploreItems.map((item) => (
                                                                <NavbarLink
                                                                    key={item.href}
                                                                    href={item.href}
                                                                    className="text-base hover:text-lightCorbin hover:bg-corbinBlue p-2 rounded-md"
                                                                    onClick={close}
                                                                >
                                                                    {item.title}
                                                                </NavbarLink>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                                            Plan
                                                        </h3>
                                                        <div className="grid gap-y-2 text-corbinBlue">
                                                            {planItems.map((item) => (
                                                                <NavbarLink
                                                                    key={item.href}
                                                                    href={item.href}
                                                                    className="text-base  hover:text-lightCorbin hover:bg-corbinBlue p-2 rounded-md"
                                                                    onClick={close}
                                                                >
                                                                    {item.title}
                                                                </NavbarLink>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverPanel>
                            </Transition>
                        </>
                    )}
                </Popover>
            </div>
        </nav>
    );
}

export default Navbar;

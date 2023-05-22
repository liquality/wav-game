import React, { useRef } from "react";
import classNames from "classnames";
import { useOnClickOutside } from "usehooks-ts";
// define a NavItem prop
export type NavItem = {
    label: string;
    href: string;
    icon: React.ReactNode;
};
// add NavItem prop to component prop
type Props = {
    open: boolean;
    navItems?: NavItem[];
    setOpen(open: boolean): void;
};

export const Sidebar = ({ open, navItems = [], setOpen }: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, (e) => {
        setOpen(false);
    });
    return (
        <div
            className={classNames({
                "flex flex-col justify-between": true, // layout
                "md:w-full md:sticky md:top-16 md:z-0 top-0 z-20 fixed": true, // positioning
                "md:h-[calc(100vh_-_64px)] h-full w-[300px]": true, // for height and width
                "transition-transform .3s ease-in-out md:-translate-x-0": true, //animations
                "-translate-x-full ": !open, //hide sidebar to the left when closed
            })}
            ref={ref}
        >

            <nav className="md:sticky top-0 md:top-16">
                {/* nav items */}
                <ul className="py-2 flex flex-col gap-2">
                    {navItems.map((item, index) => {
                        return (
                            <li
                                className={classNames({
                                    "text-indigo-100 hover:bg-indigo-900": true, //colors
                                    "flex gap-4 items-center ": true, //layout
                                    "transition-colors duration-300": true, //animation
                                    "rounded-md p-2 mx-2": true, //self style
                                })}
                            >
                                {item.icon} {item.label}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};
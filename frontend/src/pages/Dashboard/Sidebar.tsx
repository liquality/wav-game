import React, { useRef } from "react";
import classNames from "classnames";
import { useOnClickOutside } from "usehooks-ts";
import { ReactComponent as WaveGraphic } from "../../images/wave_graphic.svg";

export type NavItem = {
    label: string;
    href: string;
    icon: React.ReactNode;
};
// add NavItem prop to component prop
type Props = {
    open: boolean;
    setOpen(open: boolean): void;
};

export const Sidebar = ({ open, setOpen }: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, (e) => {
        setOpen(false);
    });
    return (
        <div
            className={classNames({
                "flex flex-col": true, // layout
                "md:w-full md:sticky md:top-16 md:z-0 top-0 pt-4 mb-5 mt-5 z-20 fixed": true, // positioning
                "md:h-[calc(100vh_-_64px)] h-full w-[300px]": true, // for height and width
                "transition-transform .3s ease-in-out md:-translate-x-0": true, //animations
                "-translate-x-full ": !open, //hide sidebar to the left when closed
            })}
            ref={ref}
        >
            <div className="md:sticky flex flex-col place-items-end top-0 h-full side-bar">
                <div className="flex flex-col px-5 gap-4 mt-5">
                    <div className="artist-name">
                        TK
                    </div>
                    <div className="artist-desc">
                        Artist, Producer, Singer, Songwriter
                    </div>
                    <div className="artist-link">
                        CHANGE ARTIST
                    </div>
                </div>
            </div>

            <div className="flex flex-col px-5 pt-5 side-bar-secondary h-full w-full text-white">
                    <WaveGraphic className="artist-wave-graphic" />
                    <div className="flex flex-col mt-5">
                        <div>"Lorem ipsum dolor sit amet, consectetur adipiscing elit."</div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="flex flex-col">
                        <h2>BIO</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt malesuada ex sit amet fringilla. Aenean sagittis finibus justo, at tincidunt lacus ... Read More
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <h2>FUN FACT</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt </p>
                    </div>
                </div>


        </div>
    );
};
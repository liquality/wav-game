import React, { useRef } from "react";
import classNames from "classnames";
import { useOnClickOutside } from "usehooks-ts";
import { ReactComponent as WaveGraphic } from "../../images/wave_graphic.svg";
import { ReactComponent as ArrowRight } from "../../images/arrow_right.svg";
import { ReactComponent as DiscordIcon } from "../../images/discord.svg";
import { ReactComponent as TelegramIcon } from "../../images/telegram.svg";
import { ReactComponent as TwitterIcon } from "../../images/twitter.svg";
import ArtistImage from "../../images/artist.png";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};
// add NavItem prop to component prop
type Props = {
  open: boolean;
  setOpen(open: boolean): void;
  artist: any
};

export const Sidebar = ({ open, setOpen, artist }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, (e) => {
    setOpen(false);
  });
  return (
    <div
      className={classNames({
        "flex flex-col": true, // layout
        "w-full": true, // positioning md:sticky md:top-16 md:z-0 top-0 z-20 fixed
        "h-full md:w-[18.57rem]": true, // for height and width
        "transition-transform .3s ease-in-out md:-translate-x-0": true, //animations
        "-translate-x-full": !open, //hide sidebar to the left when closed
      })}
      ref={ref}
    >
      <div className="flex flex-col place-items-end side-bar">
        <div className="flex flex-col px-5 gap-4 mt-5">
          <div className="artist-name">{artist.name}</div>
          <div className="artist-desc">
            {artist.description}
          </div>
          <a className="artist-link flex items-center" href="/#">
            CHANGE ARTIST
            <ArrowRight className="ml-3" />
          </a>
        </div>
        <div className="flex flex-col gap-5 pt-5 side-bar-secondary h-full w-full text-white">
          <WaveGraphic className="artist-wave-graphic" />
          <div className="flex flex-col mt-4 px-5 gap-5">
            <div className="mt-3 artist-content">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            </div>
            <div className="flex flex-row items-center">
              <TwitterIcon className="mr-2" />
              <DiscordIcon className="m-2" />
              <TelegramIcon className="m-2" />
            </div>
            <img className="mt-" src={ArtistImage} alt="" />
          </div>
          <div className="flex flex-col p-5 gap-1 artist-info">
            <h2>BIO</h2>
            <p>
            {artist.bio} ... Read More
            </p>
          </div>
          <div className="flex flex-col p-5 gap-1 artist-info">
            <h2>FUN FACT</h2>
            <p>
            {artist.facts}{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

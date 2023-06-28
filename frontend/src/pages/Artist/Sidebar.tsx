import React, { useRef, useState } from "react";
import classNames from "classnames";
import { useOnClickOutside } from "usehooks-ts";
import { ReactComponent as WaveGraphic } from "../../images/wave_graphic.svg";
import { ReactComponent as ArrowRight } from "../../images/arrow_right.svg";
import { ReactComponent as TwitterIcon } from "../../images/twitter.svg";
import { ReactComponent as InstagramIcon } from "../../images/instagram.svg";
import { ReactComponent as TikTokIcon } from "../../images/tiktok.svg";
import LensIcon from "../../images/lenster.png";
import { Button } from "../../components/Button/Button";
import { ArtistBioModal } from "./ArtistBioModal";
const SocialLink = (props: { network: string; url: string }) => {
  const { network, url } = props;
  if (!url) {
    return null;
  }

  let SocialIcon = null;
  switch (network) {
    case "twitter":
      SocialIcon = TwitterIcon;
      break;
    case "instagram":
      SocialIcon = InstagramIcon;
      break;
    case "tiktok":
      SocialIcon = TikTokIcon;
      break;
    case "lens":
      SocialIcon = () => <img src={LensIcon} alt="" />;
      break;
  }

  return (
    <a
      className="hover:text-white-700 mr-2"
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      <SocialIcon />
    </a>
  );
};

export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};
// add NavItem prop to component prop
type Props = {
  open: boolean;
  setOpen(open: boolean): void;
  artist: any;
  image: any;
  setShowPickArtistModal: (show: boolean) => void;
  setChooseArtistView: (view: string) => void;
};

export const Sidebar = ({
  open,
  setOpen,
  artist,
  image,
  setShowPickArtistModal,
  setChooseArtistView,
}: Props) => {
  const [showArtistBioModal, setShowArtistBioModal] = useState(false);
  const [readMoreQuote, setReadMoreQuote] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, (e) => {
    setOpen(false);
  });
  const handleChangeArtistClick = () => {
    setChooseArtistView("chooseArtistStart");
    setShowPickArtistModal(true);
  };

  const handleShowArtistBioModal = (artistQuote?) => {
    if (artistQuote) {
      setReadMoreQuote(true);
    }
    setShowArtistBioModal(true);
  };

  return (
    <div
      className={classNames({
        "flex grow-0": true, // layout
        //"w-full": true, // positioning md:sticky md:top-16 md:z-0 top-0 z-20 fixed
        "h-full md:w-[18.57rem]": true, // for height and width
        //"transition-transform .3s ease-in-out md:-translate-x-0": true, //animations
        //"-translate-x-full": !open, //hide sidebar to the left when closed
      })}
      ref={ref}
    >
      <ArtistBioModal
        show={showArtistBioModal}
        setShow={setShowArtistBioModal}
        artist={artist}
        readMoreQuote={readMoreQuote}
        image={image}
      />
      <div className="flex flex-col place-items-end side-bar">
        <div className="flex flex-col w-full px-5 gap-4 mt-5">
          <div className="artist-name">{artist.name}</div>
          <div className="artist-desc">{artist.description}</div>
          <button
            className="artist-link flex items-center"
            onClick={() => setShowPickArtistModal(true)}
          >
            CHANGE ARTIST
            <ArrowRight className="ml-3" />
          </button>
        </div>
        <div className="flex flex-col gap-5 pt-5 side-bar-secondary h-full w-full text-white">
          <WaveGraphic className="artist-wave-graphic" />
          <div className="flex flex-col mt-4 px-5 gap-5">
            <div className="mt-3 artist-content">
              <p>
                {" "}
                {artist.quote?.slice(0, 130)}{" "}
                {artist.quote?.length > 130 ? "... " : " "}
                {artist.quote?.length > 130 ? (
                  <Button
                    size="small"
                    onClick={() => handleShowArtistBioModal(artist.quote)}
                    link
                    mode="pink"
                  >
                    Read More
                  </Button>
                ) : null}
              </p>
            </div>
            <div className="flex flex-row items-center">
              {artist && artist.socials
                ? Object.keys(artist.socials).map((network) => {
                    return (
                      <SocialLink
                        key={network}
                        network={network}
                        url={artist.socials[network]}
                      />
                    );
                  })
                : null}
            </div>
            <div
              className="artist-image mt-3 mb-5"
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>
          <div className="flex flex-col p-5 gap-1 artist-info">
            <h2>BIO</h2>
            <p>
              {artist.bio?.slice(0, 180)}{" "}
              {artist.bio?.length > 180 ? "..." : ""}
              {artist.bio?.length > 180 ? (
                <Button
                  size="small"
                  onClick={() => handleShowArtistBioModal()}
                  link
                  mode="pink"
                >
                  Read More
                </Button>
              ) : null}
            </p>
          </div>
          {artist.funFact ? (
            <div className="flex flex-col p-5 gap-1 artist-info">
              <h2>FUN FACT</h2>
              <p>
                {artist.funFact?.slice(0, 120)}{" "}
                {artist.funFact?.length > 120 ? "..." : ""}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

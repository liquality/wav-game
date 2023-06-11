import React from "react";

import { ReactComponent as DiscordIcon } from "../images/discord.svg";
import { ReactComponent as TelegramIcon } from "../images/telegram.svg";
import { ReactComponent as TwitterIcon } from "../images/twitter.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container flex flex-wrap justify-between">
        <p className="block py-2 logo-text">
          WavGame <div className="logo-addon">Beta</div>
        </p>
        <div className="flexDirectionRow ml-5 mt-4">
          <a
            className="md:hover:text-white-700 ml-3"
            href="https://twitter.com/Liquality_io/"
            target="_blank"
            rel="noreferrer"
          >
            <TwitterIcon />
          </a>{" "}
          <a
            className="md:hover:text-white-700 ml-3"
            href="https://discord.com/invite/35yAGaQ3gx"
            target="_blank"
            rel="noreferrer"
          >
            <DiscordIcon />
          </a>{" "}
          <a
            className="md:hover:text-white-700 ml-3"
            href="https://t.me/liquality"
            target="_blank"
            rel="noreferrer"
          >
            <TelegramIcon />
          </a>{" "}
        </div>
        <p
          className="mt-4 mr-5 alignTextToRight"
          style={{ fontSize: "12px", color: "#BDBDBD" }}
        >
          {" "}
          Copyright WAVwrld_ 2023. All Rights Reserved. Privacy Policy | Terms
          of Use
        </p>
      </div>
    </footer>
  );
};

export default Footer;

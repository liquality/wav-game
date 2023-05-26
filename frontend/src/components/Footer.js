import React from "react";

import { ReactComponent as DiscordIcon } from "../images/discord.svg";
import { ReactComponent as TelegramIcon } from "../images/telegram.svg";
import { ReactComponent as TwitterIcon } from "../images/twitter.svg";

const Footer = () => {
  return (
    <footer class="footer">
      <div className="flexDirectionRow">
        <p className="webfont" style={{ fontSize: "39px" }}>
          WavGame
        </p>
        <div className="flexDirectionRow ml-5 mt-4">
          <a
            className="md:hover:text-white-700 ml-3"
            href="https://docs.liquality.io/functions/auth"
            target="_blank"
            rel="noreferrer"
          >
            <TwitterIcon />
          </a>{" "}
          <a
            className="md:hover:text-white-700 ml-3"
            href="https://docs.liquality.io/functions/auth"
            target="_blank"
            rel="noreferrer"
          >
            <DiscordIcon />
          </a>{" "}
          <a
            className="md:hover:text-white-700 ml-3"
            href="https://docs.liquality.io/functions/auth"
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

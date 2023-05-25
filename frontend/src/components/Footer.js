import React from "react";

import { ReactComponent as Twitter } from "../images/twitter.svg";
import { ReactComponent as Telegram } from "../images/telegram.svg";
import { ReactComponent as Discord } from "../images/discord.svg";

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
            <Twitter />
          </a>{" "}
          <a
            className="md:hover:text-white-700 ml-3"
            href="https://docs.liquality.io/functions/auth"
            target="_blank"
            rel="noreferrer"
          >
            <Discord />
          </a>{" "}
          <a
            className="md:hover:text-white-700 ml-3"
            href="https://docs.liquality.io/functions/auth"
            target="_blank"
            rel="noreferrer"
          >
            <Telegram />
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

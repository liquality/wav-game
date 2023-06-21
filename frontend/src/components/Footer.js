import { ReactComponent as TwitterIcon } from "../images/twitter.svg";
import { ReactComponent as InstagramIcon } from "../images/instagram.svg";
import { ReactComponent as TikTokIcon } from "../images/tiktok.svg";
import LensIcon from "../images/lenster.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container flex flex-row justify-between items-center">
        <div className="logo-text">
          WavGame <div className="logo-addon">Beta</div>
        </div>
        <div className="flex ml-5">
          <a
            className="md:hover:text-white-700 ml-3"
            href="https://twitter.com/wavWRLD_"
            target="_blank"
            rel="noreferrer"
          >
            <TwitterIcon />
          </a>{" "}
          <a
            className="md:hover:text-white-700 ml-3"
            href="https://www.instagram.com/wavwrld.eth"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon />
          </a>{" "}
          <a
            className="md:hover:text-white-700 ml-3"
            href="https://www.tiktok.com/@wavwrld"
            target="_blank"
            rel="noreferrer"
          >
            <TikTokIcon />
          </a>{" "}
          <a
            className="md:hover:text-white-700 ml-3"
            href="https://lenster.xyz/u/wavwrld"
            target="_blank"
            rel="noreferrer"
          >
            <img src={LensIcon} alt="" />
          </a>{" "}
        </div>
        <div
          className="mt-4 mr-5 alignTextToRight"
          style={{ fontSize: "12px", color: "#BDBDBD" }}
        >
          {" "}
          Copyright WAVwrld_ 2023. All Rights Reserved. Privacy Policy | Terms
          of Use
        </div>
      </div>
    </footer>
  );
};

export default Footer;

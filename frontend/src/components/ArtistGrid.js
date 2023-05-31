import * as React from "react";

import { ReactComponent as NextBtn } from "../images/next_btn.svg";

export const ArtistGrid = (props) => {
  const { handleClick } = props;

  return (
    <div class="justify-center">
      <div className="flexDirectionRow justify-center mb-3">
        <button onClick={() => handleClick(1)} className="defaultArtistBtn ">
          <img
            className="avatarImage ml-2"
            src="https://avatars.githubusercontent.com/u/34882183?v=4"
            alt="Artist Avatar"
          />
          <span className="artistName">Artist Name</span>
          <NextBtn className="mr-3" />
        </button>
        <button onClick={() => handleClick(2)} className="defaultArtistBtn ">
          <img
            className="avatarImage ml-2"
            src="https://avatars.githubusercontent.com/u/34882183?v=4"
            alt="Artist Avatar"
          />
          <span className="artistName">Artist Name</span>
          <NextBtn className="mr-3" />
        </button>
        <button onClick={() => handleClick(3)} className="defaultArtistBtn ">
          <img
            className="avatarImage ml-2"
            src="https://avatars.githubusercontent.com/u/34882183?v=4"
            alt="Artist Avatar"
          />
          <span className="artistName">Artist Name</span>
          <NextBtn className="mr-3" />
        </button>
      </div>{" "}
      <div className="flexDirectionRow justify-center mb-3">
        <button onClick={() => handleClick(4)} className="defaultArtistBtn ">
          <img
            className="avatarImage ml-2"
            src="https://avatars.githubusercontent.com/u/34882183?v=4"
            alt="Artist Avatar"
          />
          <span className="artistName">Artist Name</span>
          <NextBtn className="mr-3" />
        </button>
        <button onClick={() => handleClick(5)} className="defaultArtistBtn ">
          <img
            className="avatarImage ml-2"
            src="https://avatars.githubusercontent.com/u/34882183?v=4"
            alt="Artist Avatar"
          />
          <span className="artistName">Artist Name</span>
          <NextBtn className="mr-3" />
        </button>
        <button onClick={() => handleClick(6)} className="defaultArtistBtn ">
          <img
            className="avatarImage ml-2"
            src="https://avatars.githubusercontent.com/u/34882183?v=4"
            alt="Artist Avatar"
          />
          <span className="artistName">Artist Name</span>
          <NextBtn className="mr-3" />
        </button>
        <button onClick={() => handleClick(7)} className="defaultArtistBtn ">
          <img
            className="avatarImage ml-2"
            src="https://avatars.githubusercontent.com/u/34882183?v=4"
            alt="Artist Avatar"
          />
          <span className="artistName">Artist Name</span>
          <NextBtn className="mr-3" />
        </button>
      </div>
      <div className="flexDirectionRow justify-center mb-3">
        <button onClick={() => handleClick(8)} className="defaultArtistBtn ">
          <img
            className="avatarImage ml-2"
            src="https://avatars.githubusercontent.com/u/34882183?v=4"
            alt="Artist Avatar"
          />
          <span className="artistName">Artist Name</span>
          <NextBtn className="mr-3" />
        </button>
        <button onClick={() => handleClick(9)} className="defaultArtistBtn ">
          <img
            className="avatarImage ml-2"
            src="https://avatars.githubusercontent.com/u/34882183?v=4"
            alt="Artist Avatar"
          />
          <span className="artistName">Artist Name</span>
          <NextBtn className="mr-3" />
        </button>
        <button onClick={() => handleClick(10)} className="defaultArtistBtn ">
          <img
            className="avatarImage ml-2"
            src="https://avatars.githubusercontent.com/u/34882183?v=4"
            alt="Artist Avatar"
          />
          <span className="artistName">Artist Name</span>
          <NextBtn className="mr-3" />
        </button>
      </div>
    </div>
  );
};

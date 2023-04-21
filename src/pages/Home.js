import React from "react";

export default function Home() {
  return (
    <div className="align-left pl-4 pt-5">
      <div className="h-screen flex ">
        <div className="headerBox">
          <h1 className="mb-4 font-bold tracking-tight leading-none text-docsGrey-900 md:text-3xl lg:text-4xl dark:text-white fontFamily">
            wavGAME is here
          </h1>
          <p className="mb-4 text-4xl font-bold tracking-tight belowHeaderText">
            Collect, unlock tracks, chase early releases and swag, or step-up
            the game to win it all from your favorite artist.
          </p>
          <p className="fontFamily">
            A fun burn-to-win NFT experience in 6 levels.
          </p>
        </div>
      </div>
    </div>
  );
}

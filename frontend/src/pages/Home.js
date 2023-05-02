import React from "react";
import { LoginModal } from "../components/Onboarding/LoginModal";

export default function Home() {
  const [show, setShow] = React.useState(false);
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
          <p className="mb-4 fontFamily">
            A fun burn-to-win NFT experience in 6 levels.
          </p>

          <button
            onClick={() => setShow(true)}
            type="button"
            class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900  headerBtn"
          >
            Start collecting
          </button>
          <LoginModal setShow={setShow} show={show} />
        </div>
      </div>
    </div>
  );
}

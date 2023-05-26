import { ReactComponent as LiqualityLogo } from "../../images/liquality_logo.svg";
import { ReactComponent as NextBtn } from "../../images/next_btn.svg";

import { useState, useEffect } from "react";
import { fetchSession } from "../../utils";
import UserService from "../../services/UserService";
export const PickArtist = (props) => {
  const { setContent, setHeaderText } = props;

  const [selectedId, setSelectedId] = useState(1);

  async function handleClick(id) {
    setSelectedId(id);

    try {
      const gameObject = await UserService.createGame(
        {
          user_id: fetchSession().id,
          artist_name: `Artist ${selectedId}`,
        },
        fetchSession()?.token
      );
      console.log(gameObject, "Gaaame OBJEEECT");
    } catch (err) {
      console.log(err, "error creating game with artist");
    }
  }

  console.log(fetchSession(), "session rnnn");

  function renderArtistGrid() {
    return (
      <div>
        <div className="grid grid-cols-3 gap-8 mt-4">
          {" "}
          <button
            onClick={() => handleClick(1)}
            className="defaultArtistBtn flexDirectionRow"
          >
            <img
              className="avatarImage ml-2"
              src="https://avatars.githubusercontent.com/u/34882183?v=4"
              alt="Artist Avatar"
            />
            <span className="artistName">Artist Name</span>
            <NextBtn className="mr-3" />
          </button>
          <button
            onClick={() => handleClick(2)}
            className="defaultArtistBtn flexDirectionRow"
          >
            <img
              className="avatarImage ml-2"
              src="https://avatars.githubusercontent.com/u/34882183?v=4"
              alt="Artist Avatar"
            />
            <span className="artistName">Artist Name</span>
            <NextBtn className="mr-3" />
          </button>
          <button
            onClick={() => handleClick(3)}
            className="defaultArtistBtn flexDirectionRow"
          >
            <img
              className="avatarImage ml-2"
              src="https://avatars.githubusercontent.com/u/34882183?v=4"
              alt="Artist Avatar"
            />
            <span className="artistName">Artist Name</span>
            <NextBtn className="mr-3" />
          </button>
          <button
            onClick={() => handleClick(4)}
            className="defaultArtistBtn flexDirectionRow"
          >
            <img
              className="avatarImage ml-2"
              src="https://avatars.githubusercontent.com/u/34882183?v=4"
              alt="Artist Avatar"
            />
            <span className="artistName">Artist Name</span>
            <NextBtn className="mr-3" />
          </button>
          <button
            onClick={() => handleClick(5)}
            className="defaultArtistBtn flexDirectionRow"
          >
            <img
              className="avatarImage ml-2"
              src="https://avatars.githubusercontent.com/u/34882183?v=4"
              alt="Artist Avatar"
            />
            <span className="artistName">Artist Name</span>
            <NextBtn className="mr-3" />
          </button>
          <button
            onClick={() => handleClick(6)}
            className="defaultArtistBtn flexDirectionRow"
          >
            <img
              className="avatarImage ml-2"
              src="https://avatars.githubusercontent.com/u/34882183?v=4"
              alt="Artist Avatar"
            />
            <span className="artistName">Artist Name</span>
            <NextBtn className="mr-3" />
          </button>
          <button
            onClick={() => handleClick(7)}
            className="defaultArtistBtn flexDirectionRow"
          >
            <img
              className="avatarImage ml-2"
              src="https://avatars.githubusercontent.com/u/34882183?v=4"
              alt="Artist Avatar"
            />
            <span className="artistName">Artist Name</span>
            <NextBtn className="mr-3" />
          </button>
          <button
            onClick={() => handleClick(8)}
            className="defaultArtistBtn flexDirectionRow"
          >
            <img
              className="avatarImage ml-2"
              src="https://avatars.githubusercontent.com/u/34882183?v=4"
              alt="Artist Avatar"
            />
            <span className="artistName">Artist Name</span>
            <NextBtn className="mr-3" />
          </button>
          <button
            onClick={() => handleClick(9)}
            className="defaultArtistBtn flexDirectionRow"
          >
            <img
              className="avatarImage ml-2"
              src="https://avatars.githubusercontent.com/u/34882183?v=4"
              alt="Artist Avatar"
            />
            <span className="artistName">Artist Name</span>
            <NextBtn className="mr-3" />
          </button>
          <button
            onClick={() => handleClick(10)}
            className="defaultArtistBtn flexDirectionRow"
          >
            <img
              className="avatarImage ml-2"
              src="https://avatars.githubusercontent.com/u/34882183?v=4"
              alt="Artist Avatar"
            />
            <span className="artistName">Artist Name</span>
            <NextBtn className="mr-3" />
          </button>
        </div>

        {selectedId && (
          <p
            style={{ textDecoration: "none", fontFamily: "Sora" }}
            className="modalTerms mt-3 "
          >
            ARTIST NAME SELECTED ID: {selectedId}.
          </p>
        )}
      </div>
    );
  }

  const handleSetNewPage = () => {
    setContent("creditcardPayment");
    setHeaderText("Get NFTs to Play");
  };

  return (
    <div className="text-center mx-auto">
      {/*  */}
      <div className="flex justify-center items-center mx-auto">
        {" "}
        {renderArtistGrid()}
      </div>

      <button
        style={{ width: "180px" }}
        className="modalButtonSignIn  mt-5 mb-5 px-4"
        onClick={handleSetNewPage}
      >
        Continue
      </button>
    </div>
  );
};

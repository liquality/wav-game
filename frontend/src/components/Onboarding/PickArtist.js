import { ReactComponent as LiqualityLogo } from "../../images/liquality_logo.svg";

import { useState, useEffect } from "react";
import { fetchSession } from "../../utils";
import UserService from "../../services/UserService";
import { ArtistGrid } from "../ArtistGrid";
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
        <ArtistGrid />
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

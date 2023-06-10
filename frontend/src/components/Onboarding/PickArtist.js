import { ReactComponent as LiqualityLogo } from "../../images/liquality_logo.svg";

import { useState, useEffect } from "react";
import { fetchSession } from "../../utils";
import UserService from "../../services/UserService";
import { ArtistGrid } from "../ArtistGrid";
import CustomButton from "../Button";
export const PickArtist = (props) => {
  const { setContent, setHeaderText, setSelectedId, selectedId } = props;

  async function createGame() {
    try {
      const gameObject = await UserService.createGame(
        {
          user_id: fetchSession().id,
          artist_name: selectedId.id,
          game_symbol_id: selectedId.number_id,
        },
        fetchSession()?.token
      );
    } catch (err) {
      console.log(err, "error creating game with artist");
    }
  }

  console.log(selectedId, "selected id");
  function renderArtistGrid() {
    return (
      <div className="mt-5">
        <ArtistGrid handleClick={setSelectedId} />
        {selectedId && (
          <p
            style={{ textDecoration: "none", fontFamily: "Sora" }}
            className="modalTerms mt-3 "
          >
            ARTIST NAME SELECTED ID: {selectedId.number_id}.
          </p>
        )}
      </div>
    );
  }

  const handleSetNewPage = async () => {
    await createGame();
    setContent("creditcardPayment");
    setHeaderText("Get NFTs to Play");
  };

  return (
    <div className="contentView text-center mx-auto">
      {/*  */}
      <div className="flex justify-center items-center mx-auto mt-5">
        {" "}
        {renderArtistGrid()}
      </div>

      <CustomButton
        type="big"
        pink
        disabled={selectedId ? false : true}
        onClick={handleSetNewPage}
        mt="100px"
      >
        CONTINUE
      </CustomButton>
    </div>
  );
};

import { ReactComponent as LiqualityLogo } from "../../images/liquality_logo.svg";

import { useState, useEffect } from "react";
import { fetchSession } from "../../utils";
import UserService from "../../services/UserService";
import { ArtistGrid } from "../ArtistGrid";
import CustomButton from "../Button";
export const PickArtist = (props) => {
  const {
    type,
    setContent,
    setHeaderText,
    setSelectedId,
    selectedId,
    handleClose,
  } = props;

  async function createGame() {
    try {
      const gameObject = await UserService.createGame(
        {
          user_id: fetchSession().id,
          artist_name: selectedId?.id,
          game_symbol_id: selectedId?.number_id,
        },
        fetchSession()?.token
      );
    } catch (err) {
      console.log(err, "error creating game with artist");
    }
  }

  function renderArtistGrid() {
    return (
      <div className="mt-5">
        <ArtistGrid selectedId={selectedId} handleClick={setSelectedId} />
      </div>
    );
  }

  const handleSetNewPage = async () => {
    if (type !== "onboarding") {
      await createGame();
      setContent("gameIncentives");
      setHeaderText("Game Incentives");
    } else {
      await createGame();
      setContent("creditcardPayment");
      setHeaderText("Get NFTs to Play");
    }
  };

  return (
    <div className="contentView text-center mx-auto">
      {/*  */}
      <div className="flex justify-center items-center mx-auto mt-5">
        {" "}
        {renderArtistGrid()}
      </div>

      <div className="flexDirectionRow flex justify-center items-center mt-24 ">
        <CustomButton
          type="big"
          pink
          disabled={selectedId ? false : true}
          onClick={handleSetNewPage}
        >
          {type === "onboarding" ? "CONTINUE" : "SELECT"}
        </CustomButton>
        {type === "onboarding" ? null : (
          <button className="ml-5 mr-5" onClick={handleClose}>
            CANCEL
          </button>
        )}
      </div>
    </div>
  );
};

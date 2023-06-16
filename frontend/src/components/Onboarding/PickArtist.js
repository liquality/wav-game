import { fetchSession } from "../../utils";
import UserService from "../../services/UserService";
import { ArtistGrid } from "../ArtistGrid";
import CustomButton from "../Button";
import StaticDataService from "../../services/StaticDataService";
import { useEffect, useState } from "react";
export const PickArtist = (props) => {
  const {
    type,
    setContent,
    setHeaderText,
    setSelectedId,
    selectedId,
    handleClose,
  } = props;
  const [artistData, setArtistData] = useState([]);
  const [artistImages, setArtistImages] = useState({});
  const [games, setGames] = useState([]);
  async function createGame() {
    try {
      await UserService.createGame(
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

  const fetchArtist = async (id) => {
    try {
      const artist = await StaticDataService.getArtists();
      return artist;
    } catch (err) {
      console.log(err, "Error fetching the artist");
    }
  };

  const fetchGamesByUserId = async () => {
    try {
      const user = await UserService.getGameByUserId(
        fetchSession().id, //userid
        "",
        fetchSession().token
      );

      return user;
    } catch (err) {
      console.log(err, "Error fetching user");
    }
  };

  useEffect(() => {
    const init = async () => {
      const artists = await fetchArtist();
      let gamesArray = await fetchGamesByUserId();
      const images = await StaticDataService.getArtistImages();
      setArtistImages(images);
      setGames(gamesArray);
      setArtistData(artists);
    };

    init();
  }, []);

  function renderArtistGrid() {
    return (
      <div className="mt-5">
        <ArtistGrid
          artistData={artistData}
          artistImages={artistImages}
          games={games}
          selectedId={selectedId}
          handleClick={setSelectedId}
        />
      </div>
    );
  }

  const handleSetNewPage = async () => {
    if (type !== "onboarding") {
      const gameAlreadyStarted = games?.find((game) => {
        if (game.artist_name === selectedId.id) return game.level;
      });
      //if game already exists dont create it again
      if (gameAlreadyStarted) {
        setHeaderText("Game Incentives");
        setContent("gameIncentives");
      } else {
        await createGame();
        setContent("gameIncentives");
        setHeaderText("Game Incentives");
      }
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

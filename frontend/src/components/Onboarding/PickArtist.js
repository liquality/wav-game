import { fetchSession } from "../../utils";
import UserService from "../../services/UserService";
import { ArtistGrid } from "../ArtistGrid";
import { Button } from "../Button/Button";
import StaticDataService from "../../services/StaticDataService";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../DataContext";
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
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const navigate = useNavigate();
  const { setNfts, setNftCount } = useContext(DataContext);

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

  const handleClick = (artist, _navigate) => {
    // check game status if it not started yet we redirect to the modal, if not just redirecto to the page
    const game = games?.find((g) => {
      return g.artist_name === artist?.id;
    });
    setSelectedId(artist);
    setShouldNavigate(_navigate);

    if (game) {
      setNfts(null);
      navigate(`/artist/${game.artist_name}`);
    }
  };

  function renderArtistGrid() {
    return (
      <div className="mt-5">
        <ArtistGrid
          type={type}
          handleClose={handleClose}
          artistData={artistData}
          artistImages={artistImages}
          games={games}
          selectedId={selectedId}
          handleClick={handleClick}
        />
      </div>
    );
  }

  const handleSetNewPage = async () => {
    if (type !== "onboarding") {
      const gameAlreadyStarted = games?.find((game) => {
        return game.artist_name === selectedId.id;
      });
      //if game already exists dont create it again
      if (gameAlreadyStarted && !shouldNavigate) {
        setHeaderText("Get Cards To Play");
        setContent("creditCardPayment");
      } else if (shouldNavigate) {
        navigate(`/artist/${selectedId?.id}`);
        handleClose();
      } else {
        await createGame();
        setContent("creditCardPayment");
        setHeaderText("Get Cards To Play");
      }
    } else {
      await createGame();
      setContent("creditCardPayment");
      setHeaderText("Get Cards to Play");
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
        <Button
          size={"large"}
          disabled={selectedId ? false : true}
          mode={"pink"}
          onClick={handleSetNewPage}
        >
          {type === "onboarding" ? "CONTINUE" : "SELECT"}
        </Button>
        {type === "onboarding" ? null : (
          <button className="ml-5 mr-5" onClick={handleClose}>
            CANCEL
          </button>
        )}
      </div>
    </div>
  );
};

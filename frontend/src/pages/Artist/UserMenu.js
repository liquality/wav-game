import React from "react";
import {
  fetchSession,
  getPublicKey,
  logOut,
  shortenAddress,
} from "../../utils";
import UserService from "../../services/UserService";
import { ReactComponent as CopyIcon } from "../../images/copy_icon.svg";
import { useNavigate } from "react-router-dom";

const UserMenu = ({ isOpen, onClose, setShowPickArtistModal }) => {
  const [user, setUser] = React.useState({});
  const [games, setGames] = React.useState([]);

  const navigate = useNavigate();

  const handleCopyClick = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard: ", text);
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };

  const fetchUser = async () => {
    try {
      const user = await UserService.getUserByUserId(
        fetchSession().id, //userid
        fetchSession().token
      );

      return user;
    } catch (err) {
      console.log(err, "Error fetching user");
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

  React.useEffect(() => {
    const fetchData = async () => {
      const user = await fetchUser();
      setUser(user);
      const games = await fetchGamesByUserId();
      setGames(games);
    };
    fetchData();
    return () => {
      //any cleanup
    };
  }, []);

  const handleChooseNewArtist = () => {
    setShowPickArtistModal(true);
    onClose();
  };

  const renderNumberOfActiveGames = () => {
    let rows = [];
    if (games) {
      rows = games.map((game, index) => {
        return (
          <div key={index} className="pr-5 mt-3">
            <button
              className="pl-3 pb-3 userMenuText"
              onClick={() => navigate(`/artist/${game.artist_name}`)}
            >
              Game {game.game_symbol_id / 1000}
            </button>
          </div>
        );
      });
    } else {
      return <p>No NFTs available</p>;
    }

    return rows;
  };

  return (
    <>
      {isOpen && (
        <div className="fixed  top-24 right-24 w-64 h-418   z-50 userMenuDiv">
          <b>
            <p className="pl-3 pt-4 userMenuText">Hello {user?.username}</p>
          </b>
          <button
            onClick={() => handleCopyClick(getPublicKey())}
            className=" pl-3 mb-3 userMenuAddressText flexDirectionRow"
          >
            {shortenAddress(getPublicKey())} <CopyIcon className="ml-2 mt-1" />
          </button>
          <div style={{ width: "100%" }} className="line"></div>

          {renderNumberOfActiveGames()}
          <div style={{ width: "100%" }} className="line"></div>
          <button
            className="pl-3 pt-4 userMenuText"
            onClick={() => handleChooseNewArtist()}
          >
            Choose New Artist
          </button>

          <p
            onClick={logOut}
            className="cursor-pointer pl-3 pt-4 pb-3 userMenuText lightPink"
          >
            Log out
          </p>
        </div>
      )}
    </>
  );
};

export default UserMenu;

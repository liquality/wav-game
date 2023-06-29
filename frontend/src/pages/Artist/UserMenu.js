import { useRef, useState, useEffect, useContext } from "react";
import {
  fetchSession,
  getPublicKey,
  logOut,
  shortenAddress,
} from "../../utils";
import UserService from "../../services/UserService";
import { ReactComponent as CopyIcon } from "../../images/copy_icon.svg";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../DataContext";

const AvatarComponent = ({ avatar }) => {
  return (
    <div
      className="userAvatar p-2 flex items-center justify-center"
      style={{ backgroundImage: `url(${avatar})` }}
    ></div>
  );
};

const UserMenu = ({
  isOpen,
  onClose,
  setShowPickArtistModal,
  setUserMenuOpen,
}) => {
  const wrapperRef = useRef(null);

  const [user, setUser] = useState({});
  const [games, setGames] = useState([]);
  const { setNfts, setNftCount } = useContext(DataContext);

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

  const logOutAndNavigate = () => {
    navigate("/");
    logOut();
  };

  useEffect(() => {
    const handleMouseOutside = (event) => {
      if (
        wrapperRef &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    const fetchData = async () => {
      const user = await fetchUser();
      setUser(user);
      const games = await fetchGamesByUserId();
      setGames(games);
    };
    fetchData();

    document.addEventListener("mouseover", handleMouseOutside);
    document.addEventListener("mousedown", handleMouseOutside);
    return () => {
      //any cleanup

      document.removeEventListener("mouseover", handleMouseOutside);
      document.removeEventListener("mousedown", handleMouseOutside);
    };
    //todo rerender session here
  }, [wrapperRef, onClose]);

  const handleChooseNewArtist = () => {
    setShowPickArtistModal();
    onClose();
  };

  const handleGameSelected = (game) => {
    navigate(`/artist/${game.artist_name}`);
    //To rerender nfts and count, set to null so useeffect hook can fetch again in parent components
    setNfts(null);
    setNftCount(null);
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
              onClick={() => handleGameSelected(game)}
            >
              Game: {game.artist_name}
            </button>
          </div>
        );
      });
    } else {
      return <div className="pr-5 mt-3">No games yet</div>;
    }

    return rows;
  };

  return (
    <ul
      ref={wrapperRef}
      className="relative flex flex-col p-4 mt-2 bg-docsGrey-50 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  dark:bg-docsGrey-800 md:dark:bg-docsGrey-900 dark:border-docsGrey-700"
    >
      <button onClick={() => setUserMenuOpen(!isOpen)}>
        {user?.avatar ? <AvatarComponent avatar={user.avatar} /> : null}
      </button>
      {isOpen && (
        <div
          style={{ zIndex: 10000 }}
          className="absolute right-24 w-64 h-418   z-9999 userMenuDiv"
        >
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
            onClick={() => logOutAndNavigate()}
            className="cursor-pointer pl-3 pt-4 pb-3 userMenuText lightPink"
          >
            Log out
          </p>
        </div>
      )}
    </ul>
  );
};

export default UserMenu;

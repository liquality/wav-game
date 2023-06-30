import { useEffect, useState } from "react";
import { getGameIdBasedOnHref } from "../utils";

export const ArtistGrid = (props) => {
  const { selectedId, handleClick, artistData, artistImages, games } = props;

  const [artistFromHref, setArtistFromHref] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const currentGameBasedOnHref = await getGameIdBasedOnHref();
      setArtistFromHref(currentGameBasedOnHref);
    };
    fetchData();
    return () => {
      //any cleanup
    };
    //todo rerender session here
  }, []);

  const renderButtons = (startHere, endHere) => {
    if (artistData.length > 0) {
      return artistData.slice(startHere, endHere).map((item, index) => {
        const level = getArtistLevel(item.id);
        const userIsOnHrefArtist = item?.id === artistFromHref?.id;
        const buttonStyle = getButtonStyle(item);
        const isDisabled = isButtonDisabled(item, level);
        const renderLevel = getRenderLevel(level, isDisabled);

        const shouldNavigate = userIsOnHrefArtist || level;

        return (
          <div className="flexDirectionRow  mb-3" key={index}>
            <button
              onClick={() => handleClick(item, shouldNavigate)}
              className="defaultArtistBtn"
              disabled={isDisabled}
              style={buttonStyle}
            >
              <img
                src={artistImages[item.id]}
                className="avatarImage ml-2 object-cover"
                alt="Artist Avatar"
              />
              <div
                style={{
                  alignItems: "flex-start",
                }}
                className="flexDirectionCol"
              >
                <span
                  style={
                    selectedId?.number_id === item.number_id
                      ? { color: "white" }
                      : {}
                  }
                  className="webfont coral"
                >
                  {renderLevel}
                </span>
                <span className="artistName">{item.name + " "}</span>
              </div>
            </button>
          </div>
        );
      });
    } else {
      return null;
    }
  };

  const getArtistLevel = (artistId) => {
    return games?.find((game) => {
      if (game.artist_name === artistId) return game.level;
    });
  };

  const getButtonStyle = (item) => {
    if (selectedId?.number_id === item.number_id) {
      return { color: "white", backgroundColor: "#E61EA3" };
    }
    const finished = games?.find((game) => game.artist_name === item.id);
    if (finished?.level === 6) {
      return {
        backgroundColor: "#3D2A38",
        borderColor: "#4F4F4F",
      };
    }
    return {};
  };

  const isButtonDisabled = (item, level) => {
    const finished = games?.find((game) => game.artist_name === item.id);
    return level?.level === 6 && finished?.level_6_claimed_main_prize;
  };

  const getRenderLevel = (level, isDisabled) => {
    if (level?.level && !isDisabled) {
      return `Level ${level.level}`;
    } else if (level?.level === 6 && isDisabled) {
      return "Game ended";
    } else {
      return "Start game";
    }
  };

  return (
    <div className="justify-center">
      <div className="flexDirectionRow justify-center mb-3">
        {renderButtons(0, 2)}
      </div>{" "}
      <div className="flexDirectionRow justify-center mb-3">
        {renderButtons(2, 6)}
      </div>
      <div className="flexDirectionRow justify-center mb-3">
        {renderButtons(6, 8)}
      </div>
    </div>
  );
};

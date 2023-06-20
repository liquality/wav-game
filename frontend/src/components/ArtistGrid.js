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
    if (artistData?.length > 0 && artistData) {
      return artistData.slice(startHere, endHere).map((item, index) => {
        const game = games?.find((game) => {
          return game.artist_name === item?.id
        });

        const level = game?.level;
        console.log('game', game)
        const userIsOnHrefArtist = item?.id === artistFromHref?.id;

        //I am sorry for this convoluted and messy logic,
        //will refactor one day maybe lmao
        let buttonStyle;
        if (selectedId?.number_id === item.number_id && !userIsOnHrefArtist) {
          buttonStyle = { color: "white", backgroundColor: "#E61EA3" };
        } else if (userIsOnHrefArtist) {
          buttonStyle = { borderColor: "#FF5DC8" };
        }
        const finished = game?.level_6_claimed_main_prize || false;
        let isDisabled;
        let renderLevel;
        if (level && !finished?.level_6_claimed_main_prize) {
          renderLevel = `Level ${level}`;
        } else if (level === 6 && finished.level_6_claimed_main_prize) {
          isDisabled = true;
          renderLevel = "Game ended";
          buttonStyle = {
            backgroundColor: "#3D2A38",
            borderColor: "#4F4F4F",
          };
        } else {
          renderLevel = "Start game";
        }

        return (
          <div className="flexDirectionRow  mb-3" key={index}>
            <button
              onClick={() =>
                handleClick(item, userIsOnHrefArtist || level)
              }
              className="defaultArtistBtn"
              disabled={isDisabled}
              style={buttonStyle}
            >
              <img
                src={artistImages[item?.id]}
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
      return <p colSpan="3">No data available</p>;
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

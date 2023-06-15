import * as React from "react";
import { useState, useEffect } from "react";
import { ReactComponent as NextBtn } from "../images/next_btn.svg";
import StaticDataService from "../services/StaticDataService";
import { fetchSession } from "../utils";
import UserService from "../services/UserService";

export const ArtistGrid = (props) => {
  const { selectedId, handleClick } = props;
  const [artistData, setArtistData] = useState([]);
  const [artistImages, setArtistImages] = useState({});
  const [games, setGames] = useState([]);

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
      console.log('gamesArray', gamesArray)
      const images = await StaticDataService.getArtistImages();
      setArtistImages(images);
      setGames(gamesArray);
      setArtistData(artists);
    };

    init();
  }, []);

  const renderButtons = (startHere, endHere) => {
    if (artistData.length > 0) {
      return artistData.slice(startHere, endHere).map((item, index) => {
        const isDisabled = games?.some((game) => game.artist_name === item.id);

        let buttonStyle;
        if (isDisabled) {
          buttonStyle = { backgroundColor: "#3D2A38", borderColor: "#4F4F4F" };
        } else if (selectedId?.number_id === item.number_id) {
          buttonStyle = { backgroundColor: "#E61EA3" };
        }

        return (
          <div className="flexDirectionRow justify-center mb-3" key={index}>
            <button
              onClick={() => handleClick(item)}
              className="defaultArtistBtn"
              disabled={isDisabled}
              style={buttonStyle}
            >
              <img
                src={artistImages[item.id]}
                className="avatarImage ml-2"
                alt="Artist Avatar"
              />
              <span className="artistName">{item.name + " "}</span>
              <NextBtn className="mr-3" />
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

import * as React from "react";
import { useState, useEffect } from "react";
import { ReactComponent as NextBtn } from "../images/next_btn.svg";
import StaticDataService from "../services/StaticDataService";

export const ArtistGrid = (props) => {
  const { handleClick } = props;
  const [artistData, setArtistData] = useState([]);

  const fetchArtist = async (id) => {
    try {
      const artist = await StaticDataService.getArtists();
      return artist;
    } catch (err) {
      console.log(err, "Error fetching the artist");
    }
  };

  useEffect(() => {
    const init = async () => {
      let artistArray = await fetchArtist();
      setArtistData(artistArray);
    };

    init();
  }, []);

  const renderButtons = (startHere, endHere) => {
    let rows = [];
    if (artistData.length > 0) {
      rows = artistData.slice(startHere, endHere).map((item, index) => {
        return (
          <div className="flexDirectionRow justify-center mb-3">
            <button
              key={index}
              onClick={() => handleClick(item)}
              className="defaultArtistBtn "
            >
              <img
                src={require(`../images/artists/${item.image}`).default}
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

    return rows;
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
      <blackDave />
    </div>
  );
};

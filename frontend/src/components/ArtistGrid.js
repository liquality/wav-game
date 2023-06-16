export const ArtistGrid = (props) => {
  const { selectedId, handleClick, artistData, artistImages, games } = props;

  const renderButtons = (startHere, endHere) => {
    if (artistData.length > 0) {
      return artistData.slice(startHere, endHere).map((item, index) => {
        const level = games?.find((game) => {
          if (game.artist_name === item.id) return game.level;
        });

        //I am sorry for this convoluted and messy logic,
        //will refactor one day maybe lmao
        let buttonStyle;
        if (selectedId?.number_id === item.number_id) {
          console.log("In here?");
          buttonStyle = { color: "white", backgroundColor: "#E61EA3" };
        }
        const finished = games?.find((game) => {
          if (game.artist_name === item.id)
            return game.level_6_claimed_main_prize;
        });
        let isDisabled;
        let renderLevel;
        if (level?.level && !finished?.level_6_claimed_main_prize) {
          renderLevel = `Level ${level?.level}`;
        } else if (level?.level === 6 && finished.level_6_claimed_main_prize) {
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
              onClick={() => handleClick(item)}
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

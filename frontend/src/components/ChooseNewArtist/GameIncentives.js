import CustomButton from "../Button";
import { ReactComponent as NftTiles } from "../../images/nft_tiles.svg";

export const GameIncentives = ({
  selectedArtist,
  setContent,
  setHeaderText,
}) => {
  const handleSetContent = () => {
    setHeaderText("BUY CARDS TO PLAY");
    setContent("creditCardPayment");
  };
  return (
    <div className="container contentView flex">
      <div className="p-4 w-1/2 flex justify-center items-center margin-auto">
        {/* Big image container */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5px",
            width: "70%",
            height: "70%",
          }}
        >
          {" "}
          <NftTiles />
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-center">
        {/* Text container */}

        <div className="flexDirectionRow">
          {" "}
          <img
            className="avatarImage ml-2 object-cover"
            src={require(`../../images/artists/${selectedArtist.image}`)}
            alt="Artist Avatar"
          />{" "}
          <p className="mt-2">{selectedArtist.name}</p>
        </div>
        <p className="lineNoCenter mt-5 mb-4" style={{ width: "50%" }}></p>

        <p className="mb-4" style={{ width: "50%" }}>
          Buy cards:
        </p>
        <p className="mb-4">
          • 1 to get a live song 
          <br></br>• 2 to trade to level 2
          <br></br>• 32 to get to level 6 
          <br></br>• 63 to get to an artist's full set
        </p>
        <p className="mb-4">
        Level 4-6 have limited prizes, and you can always play for the full set. Once the transaction completes, close the Crossmint window to continue.
        </p>
        <p className="lineNoCenter mb-1" style={{ width: "50%" }}></p>
        <CustomButton
          mt={"50px"}
          type="big"
          pink
          onClick={() => handleSetContent()}
        >
          CONTINUE
        </CustomButton>
        <div className="flexDirectionRow mb-3"></div>
      </div>
    </div>
  );
};

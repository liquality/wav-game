import CustomButton from "../Button";
import { ReactComponent as NftTiles } from "../../images/nft_tiles.svg";

export const GameIncentives = ({ selectedArtist, setContent }) => {
  return (
    <div className=" contentView flex">
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
            className="avatarImage ml-2"
            src={
              require(`../../images/artists/${selectedArtist.image}`)
            }
            alt="Artist Avatar"
          />{" "}
          <p className="mt-2">{selectedArtist.name}</p>
        </div>
        <p className="lineNoCenter mt-5 mb-4" style={{ width: "50%" }}></p>

        <p className="mb-4" style={{ width: "50%" }}>
          We made two special NFTs. You are going to hold randomized amounts of
          both NFTs. To move through each level, you will need:
        </p>
        <p className="mb-4">
          • 4 items to get to level 3 <br></br>• 8 to level 4 <br></br>• 16 to
          level 5 <br></br>• 32 to level 6
        </p>
        <p className="lineNoCenter mb-1" style={{ width: "50%" }}></p>
        <CustomButton
          mt={"50px"}
          type="big"
          pink
          onClick={() => setContent("creditCardPayment")}
        >
          CONTINUE
        </CustomButton>
        <div className="flexDirectionRow mb-3"></div>
      </div>
    </div>
  );
};

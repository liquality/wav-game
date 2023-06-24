import { useState, useEffect, useContext } from "react";
import "../../App.css";
import "./artist.css";
import { Sidebar } from "./Sidebar";
import { TradeModal } from "../../components/Trade/TradeModal";
import { GameCards } from "../../components/GameCards/GameCards";
import { GameTabs } from "../../components/GameTabs/GameTabs";
import Leaderboard from "./Leaderboard";
import { ReactComponent as RewardsTout } from "../../images/rewards_tout.svg";
import { SendModal } from "../../components/Send/SendModal";
import StaticDataService from "../../services/StaticDataService";
import { useParams } from "react-router-dom";
import { fetchSession, getPublicKey } from "../../utils";
import UserService from "../../services/UserService";
import Faq from "../../components/Faq";
import { DataContext } from "../../DataContext";
import { SpinningLoader } from "../../components/SpinningLoader";
import { NftService } from "@liquality/wallet-sdk";
import { CHAIN_ID } from "../../data/contract_data";

export const Artist = (props) => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState({});
  const [image, setImage] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTrade, setShowTrade] = useState(false);
  const [showSend, setShowSend] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [tradeLevel, setTradeLevel] = useState(1);
  const {
    nfts,
    nftCount,
    setNfts,
    setNftCount,
    currentLevel,
    collectibleCount,
  } = useContext(DataContext);

  const {
    setShowPickArtistModal,
    setChooseArtistView,
    setSelectedArtist,
    userGames,
  } = props;

  const fetchArtist = async (id) => {
    try {
      const artist = await StaticDataService.findArtistById(id);
      return artist;
    } catch (err) {
      console.log(err, "Error fetching the artist");
    }
  };

  const fetchCurrentGame = async (artistNumberId) => {
    try {
      const game = await UserService.getGameByUserId(
        fetchSession().id, //userid
        artistNumberId,
        fetchSession().token
      );
      return game;
    } catch (err) {
      console.log(err, "Error fetching user");
      return null;
    }
  };

  const fetchNfts = async (address, chainId) => {
    const nfts = await NftService.getNfts(getPublicKey(), CHAIN_ID);
    return nfts;
  };

  const onTradeClick = (level) => {
    setTradeLevel(level);
    console.log("onTradeClick level ", level);
    setShowTrade(true);
  };

  const onGetMoreClick = (level) => {
    console.log("onGetMoreClick", level, artist);
    setSelectedArtist(artist);
    setChooseArtistView("gameIncentives");
    setShowPickArtistModal(true);
  };

  const onLevelSelected = (level) => {
    console.log("onLevelSelected", level);
    setSelectedLevel(level);
  };

  useEffect(() => {
    const fetchData = async () => {
      const _artist = await fetchArtist(artistId);
      if (_artist) {
        setArtist(_artist);
        const _image = (await import(`../../images/artists/${_artist.image}`))
          .default;
        const currentGame = await fetchCurrentGame(_artist?.number_id);

        setImage(_image);
        setCurrentGame(currentGame);
      }

      if (!nfts) {
        console.log("FETCHING NFTS AGAIN!");
        const nftData = await fetchNfts();
        setNfts(nftData);
      }
    };

    fetchData();
    return () => {
      //any cleanup
    };
  }, [artistId, userGames]);
  return (
    <div className="container mx-auto">
      {image && artist && currentGame && nftCount ? (
        <div>
          <div className="flex">
            <Sidebar
              open={sidebarOpen}
              setOpen={setSidebarOpen}
              artist={artist}
              image={image}
              setChooseArtistView={setChooseArtistView}
              setShowPickArtistModal={setShowPickArtistModal}
            />
            <div className="flex flex-col items-center md:ml-20 grow">
              <div className="flex flex-col md:flex-row w-full justify-between items-center game-header text-white pt-20">
                <div className="game-header-level">
                  LEVEL: {currentLevel || "0"}{" "}
                </div>
                <div className="game-header-title">
                  {artist?.name?.toUpperCase()}'s GAME_
                </div>
                <div className="game-header-counter">
                  COLLECTIBLES: {collectibleCount}
                </div>
              </div>
              <div className="flex flex-col justify-center mt-5">
                <GameTabs
                  selectedLevel={selectedLevel}
                  currentGame={currentGame}
                  onLevelSelected={onLevelSelected}
                  currentLevel={currentLevel}
                />
                <GameCards
                  onTradeClick={onTradeClick}
                  onGetMoreClick={onGetMoreClick}
                  onLevelSelected={onLevelSelected}
                  selectedLevel={selectedLevel}
                  currentLevel={currentLevel}
                  currentGame={currentGame}
                  nftCount={nftCount}
                />
              </div>
              <div className="flex flex-col   pt-24 mt-12">
                <div className="flex flex-col justify-center items-center  mb-24 relative">
                  <RewardsTout className="mt-5" />

                  <div style={{ left: "20%", top: "35%" }} className="absolute">
                    <span className="lightCoral">
                      EXCLUSIVE REWARDS FOR <br></br> FULL SET HOLDERS!
                    </span>
                  </div>
                </div>
              </div>
              <div className="flexDirectionCol">
                <Leaderboard
                  setShowSendModal={setShowSend}
                  artist={artist}
                  nftCount={nftCount}
                />
                <Faq />{" "}
              </div>
            </div>
          </div>
          <TradeModal
            setShow={setShowTrade}
            show={showTrade}
            setLevel={(level) => setTradeLevel(level)}
            level={tradeLevel}
          />
          <SendModal setShow={setShowSend} show={showSend} />{" "}
        </div>
      ) : (
        <div className="contentView m-5 p-5 flex justify-center items-center ">
          <div className="m-4 p-4">
            <SpinningLoader />
          </div>
        </div>
      )}
    </div>
  );
};

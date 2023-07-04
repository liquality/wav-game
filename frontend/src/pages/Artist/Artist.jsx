import { useState, useEffect, useContext } from "react";
import "../../App.css";
import "./artist.css";
import { Sidebar } from "./Sidebar";
import { TradeModal } from "../../components/Trade/TradeModal";
import { GameCards } from "../../components/GameCards/GameCards";
import { GameTabs } from "../../components/GameTabs/GameTabs";
import Leaderboard from "./Leaderboard";
import { ReactComponent as FullSetBannerWinner } from "../../images/winner_full_set_holder.svg";
import { ReactComponent as FullSetBannerNotEligable } from "../../images/full_set_banner_not_eligable.svg";

import { SendModal } from "../../components/Send/SendModal";
import StaticDataService from "../../services/StaticDataService";
import { useParams } from "react-router-dom";
import {
  checkIfFullSetHolder,
  fetchSession,
  getCurrentLevel,
  getPublicKey,
} from "../../utils";
import UserService from "../../services/UserService";
import Faq from "../../components/Faq";
import { DataContext } from "../../DataContext";
import { SpinningLoader } from "../../components/SpinningLoader";
import { NftService } from "@liquality/wallet-sdk";
import { CHAIN_ID } from "../../data/contract_data";
import websocketService from "../../services/Websocket/WebsocketService";

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
    setNftCount,
    setNfts,
    currentLevel,
    collectibleCount,
    setCollectibleCount,
    setCurrentLevel,
    setGetMoreLevel,
    setUserIsFullSetHolder,
    userIsFullSetHolder,
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
    setGetMoreLevel(level);
    setChooseArtistView("creditCardPayment");
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

      if (!nfts && !nftCount && _artist) {
        console.log("FETCHING NFTS AGAIN! BÄ");
        const nftData = await fetchNfts();
        const _currentLevel = await getCurrentLevel(nftData, _artist.number_id);
        const isFullSetHolder = await checkIfFullSetHolder(_artist?.number_id);

        setNftCount(_currentLevel.levels);
        setCollectibleCount(_currentLevel.totalCollectibles);
        setCurrentLevel(_currentLevel.currentLevel);
        setNfts(nftData);
        setUserIsFullSetHolder(isFullSetHolder);
        websocketService.connect(fetchSession().id);
      }
    };
    fetchData();
    return () => {
      //any cleanup
    };
  }, [artistId, userGames, nfts, setNfts, nftCount, userIsFullSetHolder]);

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
              <div className="flex flex-col md:flex-row w-full justify-between items-center game-header text-white pt-3">
                <div className="game-header-level">
                  LEVEL: {currentLevel || "0"}{" "}
                </div>
                <div className="game-header-title">
                  {artist?.name?.toUpperCase()}'s GAME
                </div>
                <div className="game-header-counter">
                  CARDS: {collectibleCount}
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
                  userIsFullSetHolder={userIsFullSetHolder}
                  onTradeClick={onTradeClick}
                  onGetMoreClick={onGetMoreClick}
                  onLevelSelected={onLevelSelected}
                  selectedLevel={selectedLevel}
                  currentLevel={currentLevel}
                  currentGame={currentGame}
                  nftCount={nftCount}
                />
              </div>
              <div className="flex flex-col pt-12 mt-12">
                <div className="flex flex-col justify-center items-center  mb-24 relative">
                  {userIsFullSetHolder ? (
                    <FullSetBannerWinner />
                  ) : (
                    <FullSetBannerNotEligable />
                  )}
                </div>
              </div>
              
              <div className="flexDirectionCol">
                <Leaderboard
                  setShowSendModal={setShowSend}
                  artist={artist}
                  nftCount={nftCount}
                  currentLevel={currentLevel}
                  currentGame={currentGame}
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

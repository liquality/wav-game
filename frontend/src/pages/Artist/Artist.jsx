import { useState, useEffect } from "react";
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
import { NftService } from "@liquality/wallet-sdk";
import { WAV_NFT_ADDRESS } from "../../data/contract_data";
import { fetchSession } from "../../utils";
import UserService from "../../services/UserService";
import { countNFTsByLevel, getPublicKey } from "../../utils";
import { CHAIN_ID } from "../../data/contract_data";

export const Artist = (props) => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState({});
  const [image, setImage] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTrade, setShowTrade] = useState(false);
  const [showSend, setShowSend] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);

  const [selectedLevel, setSelectedLevel] = useState(currentGame?.level || 1);
  const {
    setShowPickArtistModal,
    setChooseArtistView,
    setSelectedArtist,
    userGames,
  } = props;
  const [wavNfts, setWavNfts] = useState(null);
  const [nfts, setNfts] = useState(null);
  const [nftCount, setNftCount] = useState({});

  const fetchNfts = async (address, chainId) => {
    const nfts = await NftService.getNfts(getPublicKey(), CHAIN_ID);
    return nfts;
  };

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

  const fetchNftCollection = async (id) => {
    try {
      const wavNfts = await NftService.getNftsForContract(
        WAV_NFT_ADDRESS,
        80001
      );
      return wavNfts;
    } catch (err) {
      console.log(err, "Error fetching the wav nfts");
    }
  };

  const onTradeClick = (level) => {
    console.log("onTradeClick", level);
    setShowTrade(true);
    setSelectedLevel(level);
  };

  const onGetMoreClick = (level) => {
    console.log("onGetMoreClick", level, artist);
    setSelectedArtist(artist);
    setChooseArtistView("gameIncentives");
    setShowPickArtistModal(true);
  };

  const onLevelSelected = (level) => {
    console.log("onLevelSelected", level);
    setSelectedLevel(level || currentGame?.level || 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const _artist = await fetchArtist(artistId);
      if (_artist) {
        setArtist(_artist);
        const _image = (await import(`../../images/artists/${_artist.image}`))
          .default;
        const _wavNfts = await fetchNftCollection();
        const currentGame = await fetchCurrentGame(_artist?.number_id);

        if (!nfts) {
          const nftData = await fetchNfts();
          setNfts(nftData);
        }

        if (_artist.number_id && nfts) {
          const _nftCount = await countNFTsByLevel(nfts, _artist.number_id);
          setNftCount(_nftCount);
        }

        setWavNfts(_wavNfts);
        setImage(_image);
        setCurrentGame(currentGame);
      }
    };

    fetchData();
    return () => {
      //any cleanup
    };
  }, [artistId, userGames, nfts]);

  return (
    <div className="container mx-auto">
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
              LEVEL: {currentGame?.level || "0"}{" "}
            </div>
            <div className="game-header-title">
              {artist?.name?.toUpperCase()}'s GAME_
            </div>
            <div className="game-header-counter">COLLECTABLES: 42</div>
          </div>
          <div className="flex flex-col justify-center mt-5">
            <GameTabs
              selectedLevel={selectedLevel}
              currentGame={currentGame}
              onLevelSelected={onLevelSelected}
            />
            <GameCards
              onTradeClick={onTradeClick}
              onGetMoreClick={onGetMoreClick}
              onLevelSelected={onLevelSelected}
              selectedLevel={selectedLevel}
              currentGame={currentGame}
              nftCount={nftCount}
            />
          </div>
          <div className="flex flex-col  items-center pt-24 mt-12">
            <div className="flex flex-col justify-center items-center  mb-24 relative">
              <RewardsTout className="mt-5" />

              <div style={{ left: "20%", top: "35%" }} className="absolute">
                <span className="lightCoral">
                  EXCLUSIVE REWARDS FOR <br></br> FULL SET HOLDERS!
                </span>
              </div>
            </div>
            <Leaderboard setShowSendModal={setShowSend} artist={artist} />
          </div>
          <div className="flex flex-col  items-center   pt-24 mt-12"></div>
        </div>
      </div>
      <TradeModal setShow={setShowTrade} show={showTrade} />

      <SendModal setShow={setShowSend} show={showSend} />
    </div>
  );
};

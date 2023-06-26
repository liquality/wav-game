import { DataContext } from "./DataContext";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { Terms } from "./pages/Terms";
import { getCurrentLevel, getPublicKey, setupSDK } from "./utils";
import Footer from "./components/Footer";
import { Artist } from "./pages/Artist/Artist";
import { useState, useEffect } from "react";
import UserService from "./services/UserService";
import { fetchSession } from "./utils";
import { SpinningLoader } from "./components/SpinningLoader";
import { NftService } from "@liquality/wallet-sdk";
import { CHAIN_ID } from "./data/contract_data";
import { getGameIdBasedOnHref } from "./utils";

function App() {
  setupSDK();

  const [showPickArtistModal, setShowPickArtistModal] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [chooseArtistView, setChooseArtistView] = useState("chooseArtistStart");
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [nfts, setNfts] = useState(null);
  const [nftCount, setNftCount] = useState(null);
  const [collectibleCount, setCollectibleCount] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);

  const fetchNfts = async (address, chainId) => {
    const nfts = await NftService.getNfts(getPublicKey(), CHAIN_ID);
    return nfts;
  };

  const fetchArtist = async () => {
    try {
      const artist = await getGameIdBasedOnHref();
      return artist;
    } catch (err) {
      console.log(err, "Error fetching the artist");
    }
  };

  const fetchUser = async () => {
    if (fetchSession()?.id) {
      try {
        const user = await UserService.getUserByUserId(
          fetchSession().id, //userid
          fetchSession().token
        );
        return user;
      } catch (err) {
        console.log(err, "Error fetching user");
      }
    } else return {};
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const user = await fetchUser();
      setUser(user);
      setLoading(false);

      const _artist = await fetchArtist();
      console.log(_artist, "artist?");

      if (!nfts) {
        console.log("FETCHING NFTS AGAIN!");
        const nftData = await fetchNfts();
        setNfts(nftData);
      }

      if (_artist?.number_id && nfts && !nftCount) {
        console.log("FETCHING COUNT AGAIN!");
        const _currentLevel = await getCurrentLevel(nfts, _artist.number_id);
        setNftCount(_currentLevel.levels);
        setCollectibleCount(_currentLevel.totalCollectibles);
        setCurrentLevel(_currentLevel.currentLevel);
      }
    };

    fetchData();
    return () => {};
  }, [nfts, nftCount]);

  return (
    <div className="stretched device-xl no-transition">
      <DataContext.Provider
        value={{
          loginResponse: "",
          setLoginResponse: "",
          showPickArtistModal,
          setShowPickArtistModal,
          chooseArtistView,
          setChooseArtistView,
          user,

          nfts: nfts,
          setNftCount: setNftCount,
          setNfts: setNfts,
          nftCount: nftCount,
          collectibleCount: collectibleCount,
          setCurrentLevel: setCurrentLevel,
          currentLevel: currentLevel,
        }}
      >
        {" "}
        <Navbar
          user={user}
          showPickArtistModal={showPickArtistModal}
          setShowPickArtistModal={setShowPickArtistModal}
          chooseArtistView={chooseArtistView}
          setChooseArtistView={setChooseArtistView}
          selectedArtist={selectedArtist}
          setSelectedArtist={setSelectedArtist}
        />
        {loading ? (
          <div className="contentView m-5 p-5 flex justify-center items-center ">
            <div className="m-4 p-4">
              <SpinningLoader />
            </div>
          </div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  setShowPickArtistModal={setShowPickArtistModal}
                  setChooseArtistView={setChooseArtistView}
                  selectedArtist={selectedArtist}
                  setSelectedArtist={setSelectedArtist}
                />
              }
            />
            <Route path="/terms" element={<Terms />} />
            <Route
              path="/artist/:artistId"
              element={
                <Artist
                  user={user}
                  showPickArtistModal={showPickArtistModal}
                  setShowPickArtistModal={setShowPickArtistModal}
                  setChooseArtistView={setChooseArtistView}
                  selectedArtist={selectedArtist}
                  setSelectedArtist={setSelectedArtist}
                />
              }
            />
          </Routes>
        )}
        <Footer />
      </DataContext.Provider>{" "}
    </div>
  );
}

export default App;

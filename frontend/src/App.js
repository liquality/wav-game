import { DataContext } from "./DataContext";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { Terms } from "./pages/Terms";
import { getCurrentLevel, setupSDK } from "./utils";
import Footer from "./components/Footer";
import { Artist } from "./pages/Artist/Artist";
import { useState, useEffect } from "react";
import UserService from "./services/UserService";
import { fetchSession } from "./utils";
import { SpinningLoader } from "./components/SpinningLoader";
import { getGameIdBasedOnHref } from "./utils";
import { Privacy } from "./pages/Privacy";
import ContractService from "./services/ContractService";
import { Ended } from "./pages/Ended";
import { ArtistEnded } from "./pages/Artist/ArtistEnded";

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
  const [userIsFullSetHolder, setUserIsFullSetHolder] = useState(null);
  const [levelSettings, setLevelSettings] = useState({});
  const [getMoreLevel, setGetMoreLevel] = useState(1);

  async function getLevelSettings() {
    try {
      const token = fetchSession()?.token;
      return await UserService.getLevelSettings(token);
    } catch (error) {
      console.error(error);
      return {};
    }
  }

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

      const settings = await getLevelSettings();
      setLevelSettings(settings);

      const _artist = await fetchArtist();

      if (!nfts && _artist?.number_id) {
        console.log("FETCHING NFTS AGAIN!");
        const nftData = await ContractService.getNfts(_artist?.number_id);
        setNfts(nftData);

        const _currentLevel = await getCurrentLevel(nftData, _artist.number_id);
        setNftCount(_currentLevel.levels);
        setCollectibleCount(_currentLevel.totalCollectibles);
        setCurrentLevel(_currentLevel.currentLevel);

        const isFullSetHolder = await ContractService.checkIfFullSetHolder(
          _artist?.number_id
        );
        setUserIsFullSetHolder(isFullSetHolder);
      }

      setLoading(false);
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
          selectedArtist,

          nfts: nfts,
          setNftCount: setNftCount,
          setNfts: setNfts,
          nftCount: nftCount,
          collectibleCount: collectibleCount,
          setCurrentLevel: setCurrentLevel,
          setCollectibleCount: setCollectibleCount,
          currentLevel: currentLevel,
          setUserIsFullSetHolder,
          userIsFullSetHolder,
          levelSettings,
          getMoreLevel,
          setGetMoreLevel,
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
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/ended" element={<Ended />} />

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

            <Route
              path="/artistEnded/:artistId"
              element={
                <ArtistEnded
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

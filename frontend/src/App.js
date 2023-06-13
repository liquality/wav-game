import { DataContext } from "./DataContext";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { Route, Routes } from "react-router-dom";
import { Balances } from "./pages/Balances";
import { setupSDK } from "./utils";
import Footer from "./components/Footer";
import { Artist } from "./pages/Artist/Artist";
import { useState, useEffect } from 'react';
import UserService from "./services/UserService";
import { fetchSession } from "./utils";
import { SpinningLoader } from "./components/SpinningLoader";

function App() {
  setupSDK();
  const [showPickArtistModal, setShowPickArtistModal] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [userGames, setUserGames] = useState([]);

  const fetchUserGames = async () => {
    try {
      return await UserService.getGameByUserId(
        fetchSession().id, //userid
        fetchSession().token
      );
    } catch (err) {
      console.log(err, "Error fetching user");
      return [];
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
      const userGames = await fetchUserGames();
      setUserGames(userGames);
      setLoading(false);
    };

    fetchData();
    return () => {

    };
  }, []);

  return (
    <div className="stretched device-xl no-transition">
      <DataContext.Provider
        value={{
          loginResponse: "",
          setLoginResponse: "",
          showPickArtistModal,
          setShowPickArtistModal,
          user,
          userGames
        }}
      >
        {" "}
        <Navbar showPickArtistModal={showPickArtistModal} setShowPickArtistModal={setShowPickArtistModal} />
        {
          loading ? (
            <div className="contentView m-5 p-5 flex justify-center items-center ">
              <div className="m-4 p-4">
                <SpinningLoader />
              </div>
            </div>
          ) :
            (<Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/balances" element={<Balances />} />
              <Route path="/artist/:artistId"
                element={
                  <Artist
                    user={user}
                    userGames={userGames}
                    showPickArtistModal={showPickArtistModal}
                    setShowPickArtistModal={setShowPickArtistModal}
                  />
                }
              />
            </Routes>)
        }
        <Footer />
      </DataContext.Provider>{" "}
    </div>
  );
}

export default App;

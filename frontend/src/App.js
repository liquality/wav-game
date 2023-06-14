import { DataContext } from "./DataContext";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { Balances } from "./pages/Balances";
import { setupSDK } from "./utils";
import Footer from "./components/Footer";
import { Artist } from "./pages/Artist/Artist";
import { useState } from "react";

function App() {
  setupSDK();
  const [showPickArtistModal, setShowPickArtistModal] = useState(false);

  return (
    <div className="stretched device-xl no-transition">
      <DataContext.Provider
        value={{
          loginResponse: "",
          setLoginResponse: "",
          showPickArtistModal,
          setShowPickArtistModal,
        }}
      >
        {" "}
        <Navbar
          showPickArtistModal={showPickArtistModal}
          setShowPickArtistModal={setShowPickArtistModal}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/balances" element={<Balances />} />
          <Route
            path="/artist/:artistId"
            element={
              <Artist
                showPickArtistModal={showPickArtistModal}
                setShowPickArtistModal={setShowPickArtistModal}
              />
            }
          />
        </Routes>
        <Footer />
      </DataContext.Provider>{" "}
    </div>
  );
}

export default App;

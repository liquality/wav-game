import { DataContext } from "./DataContext";
import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

import { Route, Routes, useLocation } from "react-router-dom";
import { Balances } from "./pages/Balances";
import { Dashboard } from "./pages/Dashboard/Dashboard";

import { setupSDK } from "./utils";
import Footer from "./components/Footer";

function App() {
  setupSDK();

  const [loginResponse, setLoginResponse] = useState(
    JSON.parse(localStorage.getItem("loginResponse")) || {}
  );

  useEffect(() => {
    localStorage.setItem("loginResponse", JSON.stringify(loginResponse));
  }, [loginResponse]);
  const location = useLocation();

  return (
    <body className="stretched device-xl no-transition">
      <DataContext.Provider
        value={{
          loginResponse: loginResponse,
          setLoginResponse: setLoginResponse,
        }}
      > {
          location.pathname === '/artist' ? <Dashboard /> :
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/balances" element={<Balances />} />
              </Routes>
            </>
        }
        <Footer />
      </DataContext.Provider>{" "}
    </body>
  );
}

export default App;

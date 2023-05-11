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
    <DataContext.Provider
      value={{
        loginResponse: loginResponse,
        setLoginResponse: setLoginResponse,
      }}
    >
      {
        location.pathname === '/dashboard' ? <Dashboard /> :
          <body className="stretched device-xl bg-white no-transition">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/balances" element={<Balances />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </body>
      }
    </DataContext.Provider>
  );
}

export default App;

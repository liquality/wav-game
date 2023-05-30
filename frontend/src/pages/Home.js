import React from "react";

import { fetchSession } from "../utils";
import { Dashboard } from "./Dashboard/Dashboard";
import HomeWhenNotSignedIn from "../components/Home/HomeNotSignedIn";

export default function Home() {
  const [show, setShow] = React.useState(false);
  const [user, setUser] = React.useState({});

  return (
    <div>{fetchSession()?.token ? <Dashboard /> : <HomeWhenNotSignedIn />}</div>
  );
}

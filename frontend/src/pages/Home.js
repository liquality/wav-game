import React from "react";

import { fetchSession } from "../utils";
import { Artist } from "./Artist/Artist";
import HomeWhenNotSignedIn from "../components/Home/HomeNotSignedIn";

export default function Home() {
  const [show, setShow] = React.useState(false);
  const [user, setUser] = React.useState({});

  //Example implementation of how to fetch from the networkservice
  /*   const fetchUser = async () => {
    try {
      const user = await UserService.getUserByID(
        6, //userid
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZ29vZ2xlX2VtYWlsIjoiYnVidXV1QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiQmlsbGllSnV1IiwiYXZhdGFyIjpudWxsLCJwdWJsaWNfYWRkcmVzcyI6IjB4MDAwMzQiLCJpYXQiOjE2ODM4OTYwOTF9.Arc96aJHpe2IA6D1Ptxs5S2DzBbBjta2d4fsqcK0X8Q" //session goes here but empty for now
      );
      return user;
    } catch (err) {
      console.log(err, "Error fetching user");
    }
  }; */

  React.useEffect(() => {
    const fetchData = async () => {
      //const user = await fetchUser();
      //setUser(user);
    };

    fetchData();

    return () => {
      //any cleanup
    };
  }, []);

  console.log(user, "USER STATE", fetchSession());
  return (
    <div>{fetchSession()?.token ? <Artist /> : <HomeWhenNotSignedIn />}</div>
  );
}

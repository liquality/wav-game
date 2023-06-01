import React from "react";

import { fetchSession } from "../utils";
import { Artist } from "./Artist/Artist";
import HomeWhenNotSignedIn from "../components/Home/HomeNotSignedIn";
import ArtistService from "../services/ArtistService";

export default function Home() {
  const [user, setUser] = React.useState({});
  const [artist, setArtist] = React.useState({});

  const fetchArtist = async (id) => {
    try {
      const artist = await ArtistService.findArtistById(id);
      return artist;
    } catch (err) {
      console.log(err, "Error fetching the artist");
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      //const user = await fetchUser();
      //setUser(user);

      const user = await fetchArtist("tk");
      setArtist(user);
    };

    fetchData();

    return () => {
      //any cleanup
    };
  }, []);

  console.log(user, "USER STATE", fetchSession());
  if (fetchSession()?.token) {
    fetchArtist();
    return <Artist artist={artist} />;
  }

  return <HomeWhenNotSignedIn />;
}

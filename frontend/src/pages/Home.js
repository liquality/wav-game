import React from "react";
import { fetchSession } from "../utils";
import HomeWhenNotSignedIn from "../components/Home/HomeNotSignedIn";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [user, setUser] = React.useState({});
  const navigate = useNavigate();
  
  React.useEffect(() => {
    const fetchData = async () => {
      //const user = await fetchUser();
      //setUser(user);
    };

    fetchData();

    if (fetchSession()?.token) {
      return navigate('/artist/tk'); // TODO: read the right artist id depending of the game or user data
    }
    
    return () => {
      //any cleanup
    };
  }, []);

  return <HomeWhenNotSignedIn />;
}

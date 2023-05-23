import React from "react";
import { LoginModal } from "../components/Onboarding/LoginModal";
import UserService from "../services/UserService";

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

  console.log(user, "USER STATE");
  return (
    <div className="align-left pl-4 pt-5">
      <div className="h-screen flex ">
        <div className="headerBox">
          <h1 className="mb-4 font-bold tracking-tight leading-none text-docsGrey-900 md:text-3xl lg:text-4xl dark:text-white fontFamily">
            wavGAME is here
          </h1>
          <p className="mb-4 text-4xl font-bold tracking-tight belowHeaderText">
            Collect, unlock tracks, chase early releases and swag, or step-up
            the game to win it all from your favorite artist.
          </p>
          <p className="mb-4 fontFamily">
            A fun burn-to-win NFT experience in 6 levels.
          </p>

          <button
            onClick={() => setShow(true)}
            type="button"
            class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900  headerBtn"
          >
            Start collecting
          </button>
          <LoginModal setShow={setShow} show={show} />
        </div>
      </div>
    </div>
  );
}

import "../../App.css";
import { useState, useEffect, useContext } from "react";
import "./artist.css";
import { ReactComponent as SmallPinkArrow } from "../../images/small_pink_arrow.svg";
import { getHowManyPlayersAreInEachLevel, getPublicKey } from "../../utils";
import { DataContext } from "../../DataContext";

const Leaderboard = ({ setShowSendModal, artist }) => {
  const [showNfts, setShowNfts] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState(null);
  const { nftCount } = useContext(DataContext);

  useEffect(() => {
    const getLeaderboardData = async () => {
      if (artist.number_id) {
        try {
          const leaderboard = await getHowManyPlayersAreInEachLevel(
            artist.number_id
          );
          return leaderboard;
        } catch (err) {
          console.log(err, "Error fetching the leaderboard");
        }
      }
    };

    const fetchData = async () => {
      if (!leaderboardData) {
        const _leaderboardData = await getLeaderboardData();
        setLeaderboardData(_leaderboardData);
      }
    };
    fetchData();
    return () => {
      //any cleanup
    };
  }, [artist, leaderboardData]);

  const activeToggleStyle = {
    borderBottom: "1px solid #f251bc",
    color: "#f251bc",
  };

  const openSendModal = () => {
    setShowSendModal(true);
  };

  const renderNFTsToggled = () => {
    return (
      <div className="">
        <table className="text-sm text-left text-white-500 dark:text-white-400">
          <tbody>
            <tr className="bg-transparent  dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-white-900 whitespace-nowrap dark:text-white"
              >
                Level
              </th>
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">2</td>
              <td className="px-6 py-4">3</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">5</td>
              <td className="px-6 py-4">6</td>
            </tr>
            <tr className="bg-transparent  dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-white-900 whitespace-nowrap dark:text-white"
              >
                NFTs
              </th>
              <td className="px-6 py-4">
                {" "}
                {nftCount?.level1 ? nftCount?.level1 : "--"}
              </td>
              <td className="px-6 py-4">
                {" "}
                {nftCount?.level2 ? nftCount?.level2 : "--"}
              </td>
              <td className="px-6 py-4">
                {" "}
                {nftCount?.level3 ? nftCount?.level3 : "--"}
              </td>
              <td className="px-6 py-4">
                {" "}
                {nftCount?.level4 ? nftCount?.level4 : "--"}
              </td>
              <td className="px-6 py-4">
                {" "}
                {nftCount?.level5 ? nftCount?.level5 : "--"}
              </td>
              <td className="px-6 py-4">
                {" "}
                {nftCount?.level6 ? nftCount?.level6 : "--"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const renderLeaderboardToggled = () => {
    return (
      <div className="">
        <table className="text-sm text-left text-white-500 dark:text-white-400">
          <tbody>
            <tr className="bg-transparent  dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-white-900 whitespace-nowrap dark:text-white"
              >
                Level
              </th>
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">2</td>
              <td className="px-6 py-4">3</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">5</td>
              <td className="px-6 py-4">6</td>
            </tr>
            <tr className="bg-transparent  dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-white-900 whitespace-nowrap dark:text-white"
              >
                Players
              </th>
              <td className="px-6 py-4">
                {leaderboardData?.level1 ? leaderboardData?.level1 : "--"}
              </td>
              <td className="px-6 py-4">
                {leaderboardData?.level2 ? leaderboardData?.level2 : "--"}
              </td>
              <td className="px-6 py-4">
                {leaderboardData?.level3 ? leaderboardData?.level3 : "--"}
              </td>
              <td className="px-6 py-4">
                {leaderboardData?.level4 ? leaderboardData?.level4 : "--"}
              </td>
              <td className="px-6 py-4">
                {leaderboardData?.level5 ? leaderboardData?.level5 : "--"}
              </td>
              <td className="px-6 py-4">
                {leaderboardData?.level6 ? leaderboardData?.level6 : "--"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center  items-center leaderboardContainer relative">
      <div
        style={!showNfts ? activeToggleStyle : null}
        className="mt-3 mb-5 absolute left-0 leaderboardToggle"
      >
        <button onClick={() => setShowNfts(false)}>LEADERBOARD</button>
      </div>
      {!showNfts ? null : (
        <div className="flex absolute sendNfts   lightPink right-0">
          <button onClick={openSendModal} className="sendNfts">
            Send
          </button>
          <p style={{ color: "#bdbdbd" }} className="mr-3 ml-3">
            |
          </p>
          <a
            className="flex hover:no-underline lightPink  hover:text-decoration-none"
            href={`https://testnets.opensea.io/${getPublicKey()}`}
            target="_blank"
            rel="noreferrer"
          >
            View on Opensea <SmallPinkArrow className="ml-2 mt-2" />
          </a>
        </div>
      )}

      <div
        style={showNfts ? activeToggleStyle : null}
        className="mt-3 mb-5 absolute nftsToggle"
      >
        <button onClick={() => setShowNfts(true)}>NFTs</button>
      </div>

      <div className="mt-3 mb-5">
        {showNfts ? renderNFTsToggled() : renderLeaderboardToggled()}
      </div>
    </div>
  );
};

export default Leaderboard;

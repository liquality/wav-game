import React from "react";
import "../../App.css";

import "./artist.css";

const Leaderboard = ({ isOpen, onClose }) => {
  const [user, setUser] = React.useState({});

  const fetchUser = async () => {
    try {
      // const user = await UserService.getUserByUserId();

      return user;
    } catch (err) {
      console.log(err, "Error fetching user");
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {};
    fetchData();
    return () => {
      //any cleanup
    };
  }, []);

  const renderLeaderboardToggled = () => {
    return (
      <div class="">
        <table class="w-full text-sm text-left text-white-500 dark:text-white-400">
          <tbody>
            <tr class="bg-transparent  dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-white-900 whitespace-nowrap dark:text-white"
              >
                Level
              </th>
              <td class="px-6 py-4">1</td>
              <td class="px-6 py-4">2</td>
              <td class="px-6 py-4">3</td>
              <td class="px-6 py-4">4</td>
              <td class="px-6 py-4">5</td>
              <td class="px-6 py-4">6</td>
            </tr>
            <tr class="bg-transparent  dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-white-900 whitespace-nowrap dark:text-white"
              >
                Players
              </th>
              <td class="px-6 py-4">54</td>
              <td class="px-6 py-4">66</td>
              <td class="px-6 py-4">9</td>
              <td class="px-6 py-4">14</td>
              <td class="px-6 py-4">110</td>
              <td class="px-6 py-4">4</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  return (
    <div className="flex flex-col justify-center items-center leaderboardContainer relative">
      <div style={{ top: "-30%" }} className="mt-3 mb-5 absolute left-0">
        hej leaderboard
      </div>

      <div className="mt-3 mb-5">{renderLeaderboardToggled()}</div>
    </div>
  );
};

export default Leaderboard;

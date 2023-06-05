import React from "react";
import { fetchSession, logOut, shortenAddress } from "../../utils";
import UserService from "../../services/UserService";
import { ReactComponent as CopyIcon } from "../../images/copy_icon.svg";

const UserMenu = ({ isOpen, onClose }) => {
  const [user, setUser] = React.useState({});

  const fetchUser = async () => {
    try {
      const user = await UserService.getUserByUserId(
        fetchSession().id, //userid
        fetchSession().token
      );

      return user;
    } catch (err) {
      console.log(err, "Error fetching user");
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const user = await fetchUser();
      setUser(user);
    };
    fetchData();
    return () => {
      //any cleanup
    };
  }, []);
  return (
    <>
      {isOpen && (
        <div className="fixed  top-24 right-24 w-64 h-418   z-50 userMenuDiv">
          <b>
            <p className="pl-3 pt-4 userMenuText">Hello {user?.username}</p>
          </b>
          <p className="pl-3 pb-5 userMenuAddressText flexDirectionRow">
            {shortenAddress(user?.public_address)}{" "}
            <CopyIcon className="ml-2 mt-1" />
          </p>
          <div style={{ width: "100%" }} className="line"></div>

          <p className="pl-3 pt-4 userMenuText">Game 1</p>
          <p className="pl-3 pt-4 userMenuText">Game 2</p>
          <p className="pl-3 pt-4 pb-3 userMenuText">Game 3</p>
          <div style={{ width: "100%" }} className="line"></div>
          <p className="pl-3 pt-4 userMenuText">Choose New Artist</p>
          <p
            onClick={logOut}
            className="cursor-pointer pl-3 pt-4 pb-3 userMenuText lightPink"
          >
            Log out
          </p>
        </div>
      )}
    </>
  );
};

export default UserMenu;

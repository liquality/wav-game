import React from "react";
import { LoginModal } from "./Onboarding/LoginModal";
import { fetchSession } from "../utils";
import UserMenu from "../pages/Artist/UserMenu";
import UserService from "../services/UserService";

const Navbar = () => {
  const [address, setAddress] = React.useState("Sign in");
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [user, setUser] = React.useState({});
  const fetchUser = async () => {
    if (fetchSession()?.id) {
      try {
        const user = await UserService.getUserByUserId(
          fetchSession().id, //userid
          fetchSession().token
        );
        return user;
      } catch (err) {
        console.log(err, "Error fetching user");
      }
    } else return {};
  };

  const AvatarComponent = ({ avatarData }) => {
    // Convert the binary data to a base64-encoded string
    const base64Image = Buffer.from(avatarData).toString("base64");

    // Create the data URL with the base64 image data
    const imageUrl = `data:image/png;base64,${base64Image}`;

    return (
      <div className="userAvatar p-2">
        <img
          src={imageUrl}
          height={36}
          width={36}
          className="rounded-full "
          alt="avatar"
        />
      </div>
    );
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
  const openModal = () => {
    setUserMenuOpen(true);
  };

  const closeModal = () => {
    setUserMenuOpen(false);
  };

  return (
    <div>
      {userMenuOpen ? (
        <UserMenu isOpen={userMenuOpen} onClose={closeModal} />
      ) : null}
      <nav className=" sticky top-0  mt-1 z-10">
        <div className="container flex flex-wrap justify-between ">
          <p className="block py-2 navBarLogoText" aria-current="page">
            wavGame
          </p>

          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-multi-level"
          >
            <ul className="flex flex-col p-4 mt-2 bg-docsGrey-50 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  dark:bg-docsGrey-800 md:dark:bg-docsGrey-900 dark:border-docsGrey-700">
              {fetchSession()?.token ? (
                <button onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  {user?.avatar ? (
                    <AvatarComponent avatarData={user.avatar} />
                  ) : null}
                </button>
              ) : (
                <li onClick={() => setShow(true)}>
                  <button
                    type="button"
                    style={{ fontSize: 13 }}
                    className="navBarText"
                  >
                    LOGIN
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <LoginModal setShow={setShow} show={show} />
    </div>
  );
};

export default Navbar;

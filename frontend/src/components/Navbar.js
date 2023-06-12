import { useEffect, useState } from "react";
import { LoginModal } from "./Onboarding/LoginModal";
import { fetchSession } from "../utils";
import UserMenu from "../pages/Artist/UserMenu";
import UserService from "../services/UserService";
import { ChooseNewArtistModal } from "./ChooseNewArtist/ChooseNewArtistModal";
import { useParams } from 'react-router-dom';

const Navbar = () => {
  let { artistId } = useParams();
  const [address, setAddress] = useState("Sign in");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const [showPickArtistModal, setShowPickArtistModal] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      const user = await fetchUser();
      setUser(user);
    };

    fetchData();
    return () => {
      
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
        <UserMenu
          isOpen={userMenuOpen}
          onClose={closeModal}
          setShowPickArtistModal={setShowPickArtistModal}
        />
      ) : null}
      {showPickArtistModal ? (
        <ChooseNewArtistModal
          show={showPickArtistModal}
          selectedArtistId={artistId}
          setShow={setShowPickArtistModal}
        />
      ) : null}
      <nav className=" sticky top-0  mt-1 z-10">
        <div className="container flex flex-wrap justify-between">
          <div className="block py-2 logo-text" aria-current="page">
            WavGame <div className="logo-addon">Beta</div>
          </div>

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

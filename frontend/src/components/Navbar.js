import { useState } from "react";
import { LoginModal } from "./Onboarding/LoginModal";
import { fetchSession } from "../utils";
import UserMenu from "../pages/Artist/UserMenu";
import { ChooseNewArtistModal } from "./ChooseNewArtist/ChooseNewArtistModal";

const Navbar = (props) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [show, setShow] = useState(false);
  const { showPickArtistModal, setShowPickArtistModal, chooseArtistView, setChooseArtistView, selectedArtist, user } = props;

  const AvatarComponent = ({ avatar }) => {
    return (
      <div
        className="userAvatar p-2 flex items-center justify-center"
        style={{ backgroundImage: `url(${avatar})` }}
      ></div>
    );
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
          chooseArtistView={chooseArtistView}
          setChooseArtistView={setChooseArtistView}
          selectedArtist={selectedArtist}
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
                    <AvatarComponent avatar={user.avatar} />
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

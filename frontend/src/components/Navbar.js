import { useState } from "react";
import { LoginModal } from "./Onboarding/LoginModal";
import { fetchSession } from "../utils";
import UserMenu from "../pages/Artist/UserMenu";
import { ChooseNewArtistModal } from "./ChooseNewArtist/ChooseNewArtistModal";

const Navbar = (props) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [show, setShow] = useState(false);
  const {
    showPickArtistModal,
    setShowPickArtistModal,
    chooseArtistView,
    setChooseArtistView,
    selectedArtist,
    setSelectedArtist,
  } = props;

  const handleChangeArtistClick = () => {
    setChooseArtistView("chooseArtistStart");
    setShowPickArtistModal(true);
  };
  const closeModal = () => {
    setUserMenuOpen(false);
  };

  return (
    <div>
      {showPickArtistModal ? (
        <ChooseNewArtistModal
          show={showPickArtistModal}
          chooseArtistView={chooseArtistView}
          setChooseArtistView={setChooseArtistView}
          selectedArtist={selectedArtist}
          setSelectedArtist={setSelectedArtist}
          setShow={setShowPickArtistModal}
        />
      ) : null}
      <nav style={{ zIndex: 10000 }} className="relative top-0  mt-1 z-9999">
        <div className="container flex flex-wrap justify-between">
          <a href="/" className="block py-2 logo-text" aria-current="page">
            WavGame <div className="logo-addon">Beta</div>
          </a>

          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-multi-level"
          >
            {fetchSession()?.token ? (
              <UserMenu
                isOpen={userMenuOpen}
                setUserMenuOpen={setUserMenuOpen}
                onClose={closeModal}
                setShowPickArtistModal={handleChangeArtistClick}
              />
            ) : (
              <ul>
                <li onClick={() => setShow(true)}>
                  <button
                    type="button"
                    style={{ fontSize: 13 }}
                    className="navBarText"
                  >
                    LOGIN
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      <LoginModal setShow={setShow} show={show} />
    </div>
  );
};

export default Navbar;

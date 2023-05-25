import React from "react";
import { LoginModal } from "./Onboarding/LoginModal";

const Navbar = () => {
  const [address, setAddress] = React.useState("Sign in");
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("loginResponse")) {
      const connectedAccount = JSON.parse(
        localStorage.getItem("loginResponse")
      ).loginResponse;
      if (connectedAccount) {
        setAddress(
          String(connectedAccount.publicAddress).substr(0, 5) +
            "..." +
            String(connectedAccount.publicAddress).substr(38, 4)
        );
      }
    }
  }, [address]);

  return (
    <div>
      <nav className=" sticky top-0  mt-1 z-10">
        <div className="container flex flex-wrap justify-between ">
          <p className="block py-2 navBarLogoText" aria-current="page">
            wavGame_
          </p>

          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-multi-level"
          >
            <ul className="flex flex-col p-4 mt-4 bg-docsGrey-50 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  dark:bg-docsGrey-800 md:dark:bg-docsGrey-900 dark:border-docsGrey-700">
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
          </div>
        </div>
      </nav>
      <LoginModal setShow={setShow} show={show} />
    </div>
  );
};

export default Navbar;

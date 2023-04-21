import React from "react";

const Navbar = () => {
  const [address, setAddress] = React.useState("Sign in");

  const [showNftMenu, setShowNftMenu] = React.useState(false);
  const [nftMenuClass, setNftMenuClass] = React.useState(
    "absolute z-10 hidden py-2 mt-1 bg-white rounded-md shadow-lg"
  );

  const setShowDropdown = () => {
    if (!showNftMenu) {
      setShowNftMenu(true);
      setNftMenuClass("absolute z-10 py-2 mt-1 bg-white rounded-md shadow-lg");
    } else {
      setShowNftMenu(false);
      setNftMenuClass(
        "absolute z-10 hidden py-2 mt-1 bg-white rounded-md shadow-lg"
      );
    }
  };

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

  console.log(nftMenuClass, "NFT MENU CLASS", showNftMenu);
  return (
    <nav className="px-2 bg-white sticky top-0  mt-1 z-10">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="/" className="flex items-center">
          <img
            src="https://docs.liquality.io/img/logo_light.svg"
            className="mr-3 h-6 sm:h-10"
            alt="Liquality Logo"
          />
        </a>

        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-multi-level"
        >
          <ul className="flex flex-col p-4 mt-4 bg-docsGrey-50 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-docsGrey-800 md:dark:bg-docsGrey-900 dark:border-docsGrey-700">
            <li>
              <a
                href="/"
                className="block  pr-2 py-2 pr-1 pl-3 navBarText"
                aria-current="page"
              >
                wavGame |
              </a>
            </li>
            <li>
              <a href="/auth" className="block pr-2 py-2 pr-1 pl-3 navBarText">
                Artists
              </a>
            </li>
            <li>
              <a
                href="/balances"
                className="block  pr-2 py-2 pr-1 pl-3 navBarText"
              >
                Log In
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

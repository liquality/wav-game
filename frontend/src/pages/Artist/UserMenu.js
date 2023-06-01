import React from "react";

const UserMenu = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed  top-24 right-24 w-64 h-418 bg-gray-800 border border-gray-700 rounded-lg z-50 userMenuText">
          <b>
            <p className="pl-3 pt-4 userMenuText">Hello June</p>
          </b>
          <p className="pl-3 pb-5 userMenuAddressText">0x0000</p>
          <div style={{ width: "100%" }} className="line"></div>

          <p className="pl-3 pt-4 userMenuText">Game 1</p>
          <p className="pl-3 pt-4 userMenuText">Game 2</p>
          <p className="pl-3 pt-4 pb-3 userMenuText">Game 3</p>
          <div style={{ width: "100%" }} className="line"></div>
          <p className="pl-3 pt-4 userMenuText">Choose New Artist</p>
          <p className="pl-3 pt-4 pb-3 userMenuText lightPink">Log out</p>
          <button
            className="absolute bottom-0 right-2 p-2 text-gray-300 hover:text-gray-100"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default UserMenu;

import { ReactComponent as LiqualityLogo } from "../../images/liquality_logo.svg";
import { useState, useEffect } from "react";
export const PickArtist = (props) => {
  const { setContent } = props;

  const [selectedId, setSelectedId] = useState(1);

  function handleClick(id) {
    setSelectedId(id);
  }

  function renderArtistGrid() {
    return (
      <div>
        <div className="grid grid-cols-3 gap-11">
          <div
            className={`bg-gray-500 rounded-full h-12 w-12 ${
              selectedId === 1 ? "bg-blue-500" : ""
            }`}
            onClick={() => handleClick(1)}
          ></div>
          <div
            className={`bg-gray-500 rounded-full h-12 w-12 ${
              selectedId === 2 ? "bg-blue-500" : ""
            }`}
            onClick={() => handleClick(2)}
          ></div>
          <div
            className={`bg-gray-500 rounded-full h-12 w-12 ${
              selectedId === 3 ? "bg-blue-500" : ""
            }`}
            onClick={() => handleClick(3)}
          ></div>
          <div
            className={`bg-gray-500 rounded-full h-12 w-12 ${
              selectedId === 4 ? "bg-blue-500" : ""
            }`}
            onClick={() => handleClick(4)}
          ></div>
          <div
            className={`bg-gray-500 rounded-full h-12 w-12 ${
              selectedId === 5 ? "bg-blue-500" : ""
            }`}
            onClick={() => handleClick(5)}
          ></div>
          <div
            className={`bg-gray-500 rounded-full h-12 w-12 ${
              selectedId === 6 ? "bg-blue-500" : ""
            }`}
            onClick={() => handleClick(6)}
          ></div>
          <div
            className={`bg-gray-500 rounded-full h-12 w-12 ${
              selectedId === 7 ? "bg-blue-500" : ""
            }`}
            onClick={() => handleClick(7)}
          ></div>
          <div
            className={`bg-gray-500 rounded-full h-12 w-12 ${
              selectedId === 8 ? "bg-blue-500" : ""
            }`}
            onClick={() => handleClick(8)}
          ></div>
          <div
            className={`bg-gray-500 rounded-full h-12 w-12 ${
              selectedId === 9 ? "bg-blue-500" : ""
            }`}
            onClick={() => handleClick(9)}
          ></div>
        </div>

        {selectedId && (
          <p style={{ textDecoration: "none" }} className="modalTerms mt-3 ">
            ARTIST NAME SELECTED ID: {selectedId}.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="text-center mx-auto">
      {/*  */}
      <div className="flex justify-center items-center mx-auto">
        {" "}
        {renderArtistGrid()}
      </div>

      <button
        style={{ width: "105%" }}
        className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-full  px-4 py-2 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 navBarStartBtn mt-5 mb-3 px-4"
        onClick={() => setContent("creditcardPayment")}
      >
        Continue
      </button>
    </div>
  );
};

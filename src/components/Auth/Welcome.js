import * as React from "react";
import { useState, useEffect } from "react";

import { ReactComponent as AvatarPlaceholder } from "../../images/avatar_placeholder.svg";
import { ReactComponent as LiqualityLogo } from "../../images/liquality_logo.svg";
import { ReactComponent as BlackCheckmark } from "../../images/black_checkmark.svg";

export const Welcome = (props) => {
  const { show, setShow, setContent } = props;
  const [username, setUsername] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="text-center mx-auto">
      <p style={{ color: "#2FC517" }} className="modalTitle mb-1">
        Welcome
      </p>

      <p style={{ fontSize: 15 }} className="belowHeaderText mb-3">
        Username.here
      </p>

      <div className="flex justify-center items-center mx-auto">
        {" "}
        <AvatarPlaceholder />
      </div>

      <div className="flex justify-center items-center mx-auto mt-4">
        {" "}
        <BlackCheckmark />
        <p className="rightSubHeadingTextSmall ml-2"> myemail@gmail.com</p>
      </div>

      <button
        style={{ width: "105%" }}
        className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-full  px-4 py-2 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 navBarStartBtn mt-5 mb-3 px-4"
        onClick={() => setContent("welcome")}
      >
        Continue
      </button>
      <div className="flex justify-center items-center mt-3 mb-3">
        powered by <LiqualityLogo />
        Liquality
      </div>
    </div>
  );
};

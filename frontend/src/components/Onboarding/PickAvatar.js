import * as React from "react";
import { useState, useEffect } from "react";

import { ReactComponent as AvatarPlaceholder } from "../../images/avatar_placeholder.svg";
import { ReactComponent as LiqualityLogo } from "../../images/liquality_logo.svg";

export const PickAvatar = (props) => {
  const { show, setShow, setContent, setHeaderText } = props;
  const [username, setUsername] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSetNewPage = () => {
    setContent("pickArtist");
    setHeaderText("Choose an artist");
  };

  return (
    <div className="text-center mx-auto">
      <div className="flex justify-center items-center mx-auto mt-5">
        {" "}
        <AvatarPlaceholder />
      </div>

      <input
        type="password"
        className="passwordInputBox mt-5 mb-7"
        placeholder="Choose username"
        value={username}
        onChange={handleUsernameChange}
      />

      {/* TODO: make button inactive if no username is put in */}
      <button
        style={{ width: "85%" }}
        className="modalButtonSignIn  mt-5 mb-3 px-4"
        onClick={handleSetNewPage}
        disabled={username}
      >
        Continue
      </button>
    </div>
  );
};

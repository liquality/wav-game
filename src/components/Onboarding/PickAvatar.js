import * as React from "react";
import { useState, useEffect } from "react";

import { ReactComponent as AvatarPlaceholder } from "../../images/avatar_placeholder.svg";
import { ReactComponent as LiqualityLogo } from "../../images/liquality_logo.svg";

export const PickAvatar = (props) => {
  const { show, setShow, setContent } = props;
  const [username, setUsername] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="text-center mx-auto">
      <p className="modalTitle mb-3">Pick Avatar</p>

      <div className="flex justify-center items-center mx-auto">
        {" "}
        <AvatarPlaceholder />
      </div>

      <p style={{ textDecoration: "none" }} className="modalTerms mt-2">
        max. xxx kB (PNG, JPEG, WAV, xyz, xyz)
      </p>
      <input
        type="password"
        className="passwordInputBox mt-5 mb-7"
        placeholder="Choose username"
        value={username}
        onChange={handleUsernameChange}
      />

      <button
        style={{ width: "85%" }}
        className="modalButtonSignIn  mt-5 mb-3 px-4"
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

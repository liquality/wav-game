import * as React from "react";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";

import { ReactComponent as AvatarPlaceholder } from "../../images/avatar_placeholder.svg";
import { ReactComponent as LiqualityLogo } from "../../images/liquality_logo.svg";
import UserService from "../../services/UserService";
import { fetchSession } from "../../utils";

export const PickAvatar = (props) => {
  const { serviceproviderName, publicAddress, setContent, setHeaderText } =
    props;
  const [username, setUsername] = useState("");
  const [avatarImage, setAvatarImage] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSetNewPage = () => {
    // Call UserService.createUser() and pass the avatar image data along with other necessary data
    if (username && avatarImage && publicAddress) {
      UserService.createUser({
        serviceprovider_name: serviceproviderName,
        username,
        avatar: avatarImage,
        public_address: publicAddress,
      }).then((response) => {
        //Set session
        localStorage.setItem("session", JSON.stringify(response));
        console.log(response, "user obj response");

        setContent("pickArtist");
        setHeaderText("Choose an artist");
      });
    } else {
      //Set error msg here
      console.log("Please provide an avatar & username");
    }
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(avatarImage, "avatarImage");
  return (
    <div className="text-center mx-auto">
      <div
        className="flex justify-center items-center mx-auto mt-5"
        style={{ cursor: "pointer" }}
      >
        <label htmlFor="avatarInput" className="avatarButton">
          {avatarImage ? (
            <img
              src={avatarImage}
              alt="Avatar"
              className="rounded-full w-32 h-32"
            />
          ) : (
            <AvatarPlaceholder />
          )}
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: "none" }}
          />
        </label>
      </div>

      <input
        type="text"
        className="passwordInputBox mt-5 mb-2"
        placeholder="Choose username"
        value={username}
        onChange={handleUsernameChange}
      />

      {/* TODO: make button inactive if no username is put in */}
      <button
        style={{ width: "180px" }}
        className="modalButtonSignIn  mt-5 mb-5 px-4"
        onClick={handleSetNewPage}
        disabled={username ? false : true}
      >
        Continue
      </button>
    </div>
  );
};

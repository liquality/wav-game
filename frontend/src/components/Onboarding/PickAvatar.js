import { useState } from "react";
import { ReactComponent as AvatarPlaceholder } from "../../images/avatar_placeholder.svg";
import UserService from "../../services/UserService";
import CustomButton from "../Button";

export const PickAvatar = (props) => {
  const { serviceproviderName, publicAddress, setContent, setHeaderText } =
    props;
  const [username, setUsername] = useState("");
  const [avatarImage, setAvatarImage] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSetNewPage = async () => {
    // Call UserService.createUser() and pass the avatar image data along with other necessary data
    if (username && avatarImage && publicAddress) {
      try {
        const response = await UserService.createUser({
          serviceprovider_name: serviceproviderName,
          username,
          avatar: avatarImage,
          public_address: publicAddress,
        });
        //Set session
        localStorage.setItem("session", JSON.stringify(response));

        setContent("pickArtist");
        setHeaderText("Change artist");
      } catch (err) {
        console.log("Error creating user");
      }
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

  return (
    <div className="text-center mx-auto contentView">
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
          <button>
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
          </button>
        </label>
      </div>

      <input
        type="text"
        className="passwordInputBox mt-5 mb-2"
        placeholder="Choose username"
        value={username}
        onChange={handleUsernameChange}
      />

      <CustomButton
        mt={"100px"}
        type="big"
        pink
        onClick={handleSetNewPage}
        disabled={username && avatarImage ? false : true}
      >
        CONTINUE
      </CustomButton>
    </div>
  );
};

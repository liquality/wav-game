import React from "react";
import PropTypes from "prop-types";

const CustomButton = ({ type, pink, white, disabled, onClick, children }) => {
  let buttonStyle = {};
  if (white) {
    buttonStyle = {
      color: "#bb007b",
      background: "white",
      width: type === "small" ? "120px" : "128px",
      height: type === "small" ? "46px" : "56px",
      borderRadius: "100px",
    };
  } else if (pink) {
    buttonStyle = {
      color: "white",
      background: "#E61EA3",
      width: type === "small" ? "120px" : "128px",
      height: type === "small" ? "46px" : "56px",
      borderRadius: "100px",
    };
  } else if (disabled) {
    buttonStyle = {
      color: "white",
      background: "#4f4f4f",
      width: type === "small" ? "120px" : "128px",
      height: type === "small" ? "46px" : "56px",
      borderRadius: "100px",
    };
  }

  const handleOnClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  return (
    <button
      className={` ${!disabled ? "custom-button" : ""}`}
      style={buttonStyle}
      onClick={handleOnClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

CustomButton.propTypes = {
  type: PropTypes.oneOf(["small", "big"]),
  pink: PropTypes.bool,
  white: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default CustomButton;

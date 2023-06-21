import { useState, useEffect } from "react";
import { PickArtist } from "../Onboarding/PickArtist";

import { CustomModal } from "../Modal";

import { CreditcardPayment } from "../Onboarding/CreditcardPayment";
import { GameIncentives } from "./GameIncentives";

export const ChooseNewArtistModal = (props) => {
  const {
    show,
    setShow,
    selectedArtist,
    setSelectedArtist,
    chooseArtistView,
    setChooseArtistView,
  } = props;

  const [headerText, setHeaderText] = useState("Change artist");
  const handleClose = () => {
    setShow(false);
    setChooseArtistView("chooseArtistStart");
  };

  useEffect(() => {
    const init = async () => {};

    init();
  }, []);

  const whichContentToRender = () => {
    if (chooseArtistView === "chooseArtistStart") {
      return (
        <PickArtist
          selectedId={selectedArtist}
          setSelectedId={setSelectedArtist}
          setContent={setChooseArtistView}
          setHeaderText={setHeaderText}
          handleClose={handleClose}
        />
      );
      //TODO
    } else if (chooseArtistView === "gameIncentives") {
      return (
        <GameIncentives
          selectedArtist={selectedArtist}
          setContent={setChooseArtistView}
        />
      );
    } else if (chooseArtistView === "creditCardPayment") {
      return (
        <CreditcardPayment
          selectedId={selectedArtist}
          setHeaderText={setHeaderText}
          setContent={setChooseArtistView}
        />
      );
    } else return null;
  };

  return (
    <>
      <CustomModal
        type={chooseArtistView === "creditCardPayment" ? "creditCard" : null}
        show={show}
        setShow={setShow}
        content={whichContentToRender}
        modalHeaderText={headerText}
      >
        {" "}
        {whichContentToRender()}
      </CustomModal>
    </>
  );
};

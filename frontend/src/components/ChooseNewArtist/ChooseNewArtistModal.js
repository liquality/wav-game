import { useState, useEffect } from "react";
import { PickArtist } from "../Onboarding/PickArtist";

import { CustomModal } from "../Modal";

import { CreditcardPayment } from "../Onboarding/CreditcardPayment";
import { GameIncentives } from "./GameIncentives";

export const ChooseNewArtistModal = (props) => {
  const { show, setShow, selectedArtistId } = props;
  const [content, setContent] = useState("chooseArtistStart");
  const [headerText, setHeaderText] = useState("Choose an artist");
  const [selectedNft, setSelectedNft] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(selectedArtistId);
  const [txHash, setTxHash] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const init = async () => {};

    init();
  }, [content]);

  const whichContentToRender = () => {
    if (content === "chooseArtistStart") {
      return (
        <PickArtist
          selectedId={selectedArtist}
          setSelectedId={setSelectedArtist}
          setContent={setContent}
          setHeaderText={setHeaderText}
          handleClose={handleClose}
        />
      );
      //TODO
    } else if (content === "gameIncentives") {
      return (
        <GameIncentives
          selectedArtist={selectedArtist}
          setContent={setContent}
        />
      );
    } else if (content === "creditCardPayment") {
      return (
        <CreditcardPayment
          selectedId={selectedArtist}
          setHeaderText={setHeaderText}
          setContent={setContent}
        />
      );
    } else return null;
  };

  return (
    <>
      <CustomModal
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

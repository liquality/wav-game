import { useState, useEffect } from "react";
import { PickArtist } from "../Onboarding/PickArtist";

import { CustomModal } from "../Modal";

import { CreditcardPayment } from "../Onboarding/CreditcardPayment";

export const ChooseNewArtistModal = (props) => {
  const { show, setShow } = props;
  const [content, setContent] = useState("chooseArtistStart");
  const [headerText, setHeaderText] = useState("Send");
  const [selectedNft, setSelectedNft] = useState(null);

  const [selectedArtist, setSelectedArtist] = useState(null);
  const [txHash, setTxHash] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const init = async () => {};

    init();
  }, [content]);

  console.log("are we haere?");

  const whichContentToRender = () => {
    if (content === "chooseArtistStart") {
      return (
        <PickArtist
          selectedId={selectedArtist}
          setSelectedId={setSelectedArtist}
          setContent={setContent}
        />
      );
      //TODO
    } else if (content === "gameIncentives") {
      return (
        <CreditcardPayment
          setContent={setContent}
          setTxHash={txHash}
          handleClose={handleClose}
          selectedNft={selectedNft}
        />
      );
    } else if (content === "creditCardPayment") {
      return (
        <CreditcardPayment
          setContent={setContent}
          setTxHash={txHash}
          handleClose={handleClose}
          selectedNft={selectedNft}
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

import { useState, useEffect, useContext } from "react";
import { PickArtist } from "../Onboarding/PickArtist";

import { CustomModal } from "../Modal";

import { CreditcardPayment } from "../Onboarding/CreditcardPayment";
import { CompletedPayment } from "../Onboarding/CompletedPayment";
import { DataContext } from "../../DataContext";

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
  const [crossmintData, setCrossmintData] = useState(null);
  const { setNfts, setNftCount } = useContext(DataContext);
  const handleClose = () => {
    //refresh nfts here
    setShow(false);
    setChooseArtistView("chooseArtistStart");
    //To rerender nfts and count, set to null so useeffect hook can fetch again in parent components
    setNfts(null);
    setNftCount(null);
  };

  useEffect(() => {
    const init = async () => {
      if (chooseArtistView === "creditCardPayment") {
        setHeaderText("Get Cards To Play");
      }
    };

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
      //Remove this screen as per Veras request 4 July 2023
    } /* else if (chooseArtistView === "gameIncentives") {
      return (
        <GameIncentives
          selectedArtist={selectedArtist}
          setContent={setChooseArtistView}
          setHeaderText={setHeaderText}
        />
      );
    } */ else if (chooseArtistView === "creditCardPayment") {
      return (
        <CreditcardPayment
          selectedId={selectedArtist}
          setHeaderText={setHeaderText}
          setContent={setChooseArtistView}
          setCrossmintData={setCrossmintData}
          crossmintData={crossmintData}
        />
      );
    } else if (chooseArtistView === "completedPayment") {
      return (
        <CompletedPayment
          setHeaderText={setHeaderText}
          handleClose={handleClose}
          setCrossmintData={setCrossmintData}
          crossmintData={crossmintData}
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

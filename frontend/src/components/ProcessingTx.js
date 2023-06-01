import React, { useState, useEffect } from "react";

const ProcessingTx = (props) => {
  const { txHash, setTxHash } = props;
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (txHash) {
      setAnimationComplete(true);
      setTimeout(() => {
        setTxHash(null);
        setAnimationComplete(false);
      }, 3000); // Change the timeout value as needed
    }
  }, [txHash, setTxHash]);

  return (
    <div className="mb-5">
      <p className="webfont text-2xl">{txHash ? "Complete" : "Processing"}</p>
      <div
        className={`processing-div ${animationComplete ? "complete" : ""}`}
      />
    </div>
  );
};

export default ProcessingTx;

import React, { useState, useEffect } from "react";

export default function ProcessingTx({ txHash }) {
  const [percentageFilled, setPercentageFilled] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  useEffect(() => {
    if (percentageFilled < 100 && isRunning) {
      setTimeout(() => setPercentageFilled((prev) => (prev += 2)), 180);
    }
  }, [percentageFilled, isRunning]);

  console.log(process.env.REACT_APP_GELATO_API_KEY, "api key");

  return (
    <div>
      <p className="webfont text-2xl">{txHash ? "Complete" : "Processing"}</p>

      <div className="progressbar mb-5">
        <div
          style={{
            height: "100%",
            width: `${percentageFilled}%`,
            backgroundColor: "#A0E117",
            transition: "width 0.5s",
          }}
        ></div>
      </div>
      <a href={`https://mumbai.polygonscan.com/address/${txHash}`}></a>
    </div>
  );
}

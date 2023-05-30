import React, { useState, useEffect } from "react";

export const SpinningLoader = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((rotation) => rotation + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      style={{ transform: `rotate(${rotation}deg)` }}
      width="205"
      height="205"
      viewBox="0 0 225 225"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M118.049 2.35596C118.111 1.13351 119.152 0.190184 120.373 0.275832C144.423 1.96286 167.318 11.335 185.662 27.0394C204.568 43.2246 217.574 65.2222 222.642 89.5883C227.711 113.954 224.557 139.313 213.673 161.695C202.79 184.077 184.792 202.219 162.498 213.279C140.203 224.34 114.87 227.696 90.4641 222.821C66.0585 217.946 43.9583 205.116 27.6233 186.339C11.2884 167.562 1.64083 143.899 0.191044 119.054C-1.21567 94.9462 5.17255 71.0466 18.379 50.8762C19.0495 49.8522 20.4305 49.5938 21.4412 50.2843C22.4518 50.9748 22.7092 52.3526 22.0396 53.3772C9.38585 72.7375 3.26642 95.6669 4.61601 118.795C6.00868 142.662 15.2761 165.393 30.9675 183.43C46.6588 201.467 67.8883 213.791 91.3323 218.474C114.776 223.157 139.111 219.934 160.528 209.309C181.944 198.684 199.233 181.257 209.687 159.757C220.142 138.257 223.172 113.897 218.303 90.491C213.434 67.0849 200.941 45.9541 182.78 30.4065C165.18 15.3398 143.221 6.34064 120.15 4.7036C118.929 4.61697 117.988 3.57841 118.049 2.35596Z"
        fill="url(#paint0_linear_148_315)"
      />
      <path
        d="M22.6635 47.2791L22.663 47.2782C22.5167 47.0044 22.2803 46.7895 21.9965 46.6662C21.6664 46.5208 21.29 46.5079 20.9516 46.6365L20.9509 46.6368L12.623 49.8147L12.6219 49.8151C12.1742 49.9872 11.8529 50.3855 11.7928 50.8651C11.7328 51.3429 11.9429 51.8087 12.323 52.0951C12.7017 52.3805 13.2055 52.4562 13.65 52.2856C13.6503 52.2855 13.6505 52.2854 13.6508 52.2853L20.837 49.5446L24.4481 56.3352C24.4482 56.3354 24.4484 56.3357 24.4485 56.3359C24.6711 56.7568 25.1005 57.0311 25.5735 57.0651C26.0482 57.0993 26.5127 56.8866 26.7818 56.4873C27.0519 56.0864 27.0719 55.5751 26.8477 55.151L26.8472 55.1499L22.6635 47.2791Z"
        fill="#9A58F5"
        stroke="#9A57F5"
      />
      <defs>
        <linearGradient
          id="paint0_linear_148_315"
          x1="8.34034e-07"
          y1="110.455"
          x2="225"
          y2="110.455"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#9C55F6" />
          <stop offset="1" stop-color="#2CD2CA" />
        </linearGradient>
      </defs>
    </svg>
  );
};
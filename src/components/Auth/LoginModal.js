import * as React from "react";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

export const LoginModal = (props) => {
  const { show, setShow } = props;
  /*   const [tKey, setTKey] = useState<any>({});*/

  //const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <div className="w-full  text-center bg-white border ">
          <p className="modalTitle">Register or Log-in</p>
          <div className=" mt-4">
            <button className="modalButtonSignIn mb-3" onClick={handleClose}>
              Google
            </button>
            <button className="modalButtonSignIn  mb-3" onClick={handleClose}>
              Discord
            </button>
            <button className="modalButtonSignIn  mb-3" onClick={handleClose}>
              Facebook
            </button>
            <button className="modalButtonSignIn  mb-3" onClick={handleClose}>
              Twitch
            </button>
          </div>
          <div className="flex justify-center items-center">
            powered by{" "}
            <svg
              width="33"
              height="10"
              viewBox="0 0 36 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.8755 1.82596C1.8645 1.83696 1.859 1.84246 1.848 1.85346C0.8745 2.84346 0.2805 4.07546 0.0825 5.35146C0.0275 5.67596 0 6.00046 0 6.33596V6.37446C0 6.68796 0.0275 7.00696 0.0715 7.32046C0.2145 8.29396 0.5885 9.23996 1.1825 10.0705C1.375 10.3455 1.6005 10.6095 1.848 10.8625C1.859 10.8735 1.8645 10.879 1.8755 10.89C2.409 11.4235 3.003 11.836 3.6355 12.1275C5.962 13.2055 8.7945 12.7105 10.912 10.9065C10.9175 10.901 10.923 10.8955 10.9285 10.8955C13.321 8.84946 15.5155 6.99596 17.8805 6.99596C20.24 6.99596 22.44 8.84946 24.827 10.8955C25.476 11.451 26.191 11.8855 26.9445 12.1825C27.9235 12.5785 28.9575 12.749 29.975 12.6775C31.3995 12.5785 32.7745 12.001 33.8855 10.89C33.8965 10.879 33.902 10.8735 33.913 10.8625C34.1605 10.615 34.3805 10.351 34.5785 10.0705C35.1725 9.23446 35.5465 8.28846 35.6895 7.32046C35.7885 6.67146 35.783 6.00596 35.684 5.35696C35.486 4.07546 34.892 2.84896 33.9185 1.85896C33.9075 1.84796 33.902 1.84246 33.891 1.83146C32.7855 0.725959 31.4105 0.148459 29.9805 0.049459C28.963 -0.016541 27.9235 0.153959 26.939 0.549959C26.191 0.846959 25.4705 1.28146 24.827 1.83146C22.4235 3.86646 20.251 5.73096 17.8805 5.73096C15.51 5.73096 13.321 3.86096 10.923 1.82596C10.9175 1.82046 10.912 1.81496 10.912 1.81496C9.537 0.654459 7.8595 0.032959 6.215 0.032959C5.324 0.032959 4.444 0.214459 3.63 0.593959C3.003 0.885459 2.4035 1.29246 1.8755 1.82596Z"
                fill="url(#paint0_radial_1249_3467)"
              />
              <defs>
                <radialGradient
                  id="paint0_radial_1249_3467"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(-2.38741 6.35991) scale(40.9314 22.2264)"
                >
                  <stop stop-color="#1CE5C3" />
                  <stop offset="0.1025" stop-color="#1CE5C3" />
                  <stop offset="0.4747" stop-color="#5440D7" />
                  <stop offset="0.6308" stop-color="#8B2CE4" />
                  <stop offset="0.7957" stop-color="#D421EB" />
                  <stop offset="1" stop-color="#AC39FD" />
                </radialGradient>
              </defs>
            </svg>{" "}
            Liquality
          </div>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://docs.liquality.io/"
            className="modalTerms"
          >
            Terms & Conditions
          </a>
        </div>
      </Modal>
    </>
  );
};
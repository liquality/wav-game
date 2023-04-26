import { ReactComponent as LiqualityLogo } from "../../images/liquality_logo.svg";

export const PickArtist = (props) => {
  const { setContent } = props;

  return (
    <div className="text-center mx-auto">
      <p className="modalTitle mb-4">Pick/Confirm your artist</p>

      <div className="flex justify-center items-center mx-auto">
        {" "}
        <div class="grid grid-cols-3 gap-11">
          <div class="bg-gray-500 rounded-full h-12 w-12"></div>
          <div class="bg-gray-500 rounded-full h-12 w-12"></div>
          <div class="bg-gray-500 rounded-full h-12 w-12"></div>
          <div class="bg-gray-500 rounded-full h-12 w-12"></div>
          <div class="bg-gray-500 rounded-full h-12 w-12"></div>
          <div class="bg-gray-500 rounded-full h-12 w-12"></div>
          <div class="bg-gray-500 rounded-full h-12 w-12"></div>
          <div class="bg-gray-500 rounded-full h-12 w-12"></div>
          <div class="bg-gray-500 rounded-full h-12 w-12"></div>
        </div>
      </div>

      <button
        style={{ width: "105%" }}
        className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-full  px-4 py-2 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 navBarStartBtn mt-5 mb-3 px-4"
        onClick={() => setContent("creditcardPayment")}
      >
        Continue
      </button>
      <div className="flex justify-center items-center mt-3 mb-3">
        powered by <LiqualityLogo />
        Liquality
      </div>
    </div>
  );
};

import { ReactComponent as LiqualityLogo } from "../images/liquality_logo.svg";

export const PoweredByLiquality = ({ notCenter }) => {
  return (
    <div className="text-center mx-auto">
      <div
        className={
          notCenter ? "flex" : "flex justify-center items-center mt-3 mb-3"
        }
      >
        powered by <LiqualityLogo className="ml-2 mt-1" />
      </div>
    </div>
  );
};

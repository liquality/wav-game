import { createContext } from "react";


interface DataContextValue {
  loginResponse: any;
  showPickArtistModal: boolean;
  setShowPickArtistModal: (show: boolean) => void;
  setLoginResponse: (value: any) => void;
}

export const DataContext = createContext<DataContextValue>({
  loginResponse: undefined,
  showPickArtistModal: false,
  setLoginResponse: function (value: any): void {
    throw new Error("Function not implemented.");
  },
  setShowPickArtistModal: () => {}
});

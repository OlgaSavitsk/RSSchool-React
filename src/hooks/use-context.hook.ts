import { useContext } from "react";
import { AppContext } from "src/store/context";

export const useAppContext = () => useContext(AppContext);

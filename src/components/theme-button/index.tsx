import { FC, useContext } from "react";
import { AppContext } from "../../context";
import classes from "./index.module.css";

type ThemeButtonProps = {
  onClick: () => void;
};

export const ThemeButton: FC<ThemeButtonProps> = ({ onClick }) => {
  const { theme } = useContext(AppContext);
  const className = classes[theme];

  return (
    <button className={className} onClick={onClick}>
      {theme === "light" ? "Switch to dark" : "Switch to light"}
    </button>
  );
};

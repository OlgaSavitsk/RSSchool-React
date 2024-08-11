import { FC, useContext } from "react";
import classes from "./index.module.css";
import { AppContext } from "src/context";

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

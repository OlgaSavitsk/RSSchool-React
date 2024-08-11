"use client";

import { useStorage } from "@hooks/use-storage.hook";
import { SearchComponent } from "@components/search";
import { useState } from "react";
import { AppContext } from "src/context";
import PageLayout from "./page-layout";
import { RoutePath } from "src/constants/routes.constants";
import NotFoundPage from "src/app/not-found";
import classes from "./index.module.css";
import { usePathname } from "next/navigation";

const pageLayout = {
  [RoutePath.Home]: PageLayout,
  [RoutePath.Details]: PageLayout,
  [RoutePath.NotFound]: NotFoundPage,
};

type LayoutComponentProps = {
  children: React.ReactElement;
};

const LayoutComponent = ({ children }: LayoutComponentProps) => {
  const [searchValue] = useStorage("search", "");
  const [input, setSearchValue] = useState(searchValue || "");
  const [themeValue, setTheme] = useState<"dark" | "light">("dark");
  const className = classes[themeValue];
  const pathname = usePathname();

  const Layout = pageLayout[pathname as RoutePath];

  return (
    <AppContext.Provider value={{ theme: themeValue }}>
      <SearchComponent
        onChange={(value) => setSearchValue(value)}
        setToggleTheme={(theme) => setTheme(theme === "dark" ? "light" : "dark")}
      />

      <div className={`${classes.wrapper_page} ${className}`}>
        <Layout searchValue={input}>{children}</Layout>
      </div>
    </AppContext.Provider>
  );
};

export default LayoutComponent;

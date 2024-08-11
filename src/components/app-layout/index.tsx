import { useStorage } from "@hooks/use-storage.hook";
import { SearchComponent } from "@components/search";
import { Suspense, useState } from "react";
import { AppContext } from "src/context";
import PageLayout from "./page-layout";
import { RoutePath } from "src/constants/routes.constants";
import { useRouter } from "next/router";
import NotFoundPage from "@pages/404";
import classes from "./index.module.css";
import LoaderComponent from "@components/loader";

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
  const { route } = useRouter();

  const Layout = pageLayout[route as RoutePath];

  return (
    <AppContext.Provider value={{ theme: themeValue }}>
      <SearchComponent
        onChange={(value) => setSearchValue(value)}
        setToggleTheme={(theme) => setTheme(theme === "dark" ? "light" : "dark")}
      />

      <div className={`${classes.wrapper_page} ${className}`}>
        <Suspense fallback={<LoaderComponent />}>
          <Layout searchValue={input}>{children}</Layout>
        </Suspense>
      </div>
    </AppContext.Provider>
  );
};

export default LayoutComponent;

"use client";

import { isArrayWithItems } from "@utils/index";
import { CardListComponent } from "@components/card-list";
import { PaginationComponent } from "@components/pagination";
import { usePagination } from "@hooks/use-pagination.hook";
import { Suspense, useCallback, useEffect, useState } from "react";
import classes from "./index.module.css";
import { useAppContext } from "@hooks/use-context.hook";
import LoaderComponent from "@components/loader";
import { appActions } from "src/store";

type PageLayoutProps = {
  searchValue?: string;
  children: React.ReactElement;
};

const PageLayout = ({ children, searchValue }: PageLayoutProps) => {
  const [page, setPage] = useState(1);
  usePagination(page);
  const {
    dispatch,
    state: { items = [] },
  } = useAppContext();

  const setParams = useCallback(() => {
    const params = { search: searchValue || "", page: page };
    dispatch(appActions.setParams(params));
  }, [searchValue, page]);

  useEffect(() => {
    setParams();
  }, [setParams]);

  return (
    <div className={classes.wrapper}>
      <Suspense fallback={<LoaderComponent />}>
        <div className={classes.content}>
          <CardListComponent data={items} />

          {children}
        </div>
      </Suspense>
      {isArrayWithItems(items) && <PaginationComponent setPage={(page) => setPage(page)} />}
    </div>
  );
};

export default PageLayout;

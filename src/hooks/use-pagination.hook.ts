"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export const usePagination = (page: number = 1) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()) || "");
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    const search = createQueryString("page", page.toString());
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  }, [page]);
};

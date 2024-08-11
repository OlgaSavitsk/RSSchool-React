import { useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export const usePagination = (page: number = 1) => {
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(router.query.toString() || "");
      params.set(name, value);

      return params.toString();
    },
    [router.query],
  );

  useEffect(() => {
    const search = createQueryString("page", page.toString());
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  }, [page]);
};

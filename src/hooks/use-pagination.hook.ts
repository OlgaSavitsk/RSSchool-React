import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const usePagination = (page: number) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", page.toString());
    navigate(`/?${params.toString()}`);
  }, [page, location.search, navigate]);
};

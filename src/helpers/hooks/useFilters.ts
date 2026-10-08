import { useState } from "react"
import { IFilters } from "../../interfaces";

export const useFilters = (initialFilters: IFilters) => {
  const [filters, setFilters] = useState<IFilters>(initialFilters);

  const changeFilters = (key: string, value: string | number | null) => {
    setFilters((prev) => {
      return { ...prev, [key]: value, ...(key !== "page_number" ? { page_number: 1 } : {}) };
    });
  };
  return {filters, changeFilters}
};
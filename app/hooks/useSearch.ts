import { SearchContext } from "../context/SearchContext";
import { useContext } from "react";

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }

  return context;
}

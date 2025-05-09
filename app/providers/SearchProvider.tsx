import { SearchContext } from "../context/SearchContext";
import { useSearchReducer } from "../hooks/useSearchReducer";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function SearchProvider({ children }: Props) {
  const value = useSearchReducer();

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

"use client";

import { createContext } from "react";
import { useSearchReducer } from "../hooks/useSearchReducer";

export type SearchContextType = ReturnType<typeof useSearchReducer>;

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

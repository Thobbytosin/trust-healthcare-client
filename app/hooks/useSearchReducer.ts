import { SearchDoctorForm } from "../types/all.types";
import { initialState, searchReducer } from "../reducers/search.reducer";
import { useReducer } from "react";

export function useSearchReducer() {
  const [searchState, dispatch] = useReducer(searchReducer, initialState);

  const setSearchForm = (formType: SearchDoctorForm) => {
    dispatch({ type: "SET_SEARCH_FORM", payload: { ...formType } });
  };

  const setFilterValue = (value: string) => {
    dispatch({ type: "SET_FILTER_VALUE", payload: value });
  };

  const setSearchTrigger = (value: number) => {
    dispatch({ type: "SET_SEARCH_TRIGGER", payload: value });
  };

  const toogleSortOptions = () => {
    dispatch({ type: "TOOGLE_SORT_OPTIONS" });
  };

  const setSortOption = (value: string) => {
    dispatch({ type: "SET_SORT_BY", payload: value });
  };

  const setPageQuery = (value: number) => {
    dispatch({ type: "SET_PAGE_QUERY", payload: value });
  };

  const setAllSuggestions = (value: []) => {
    dispatch({ type: "SET_ALL_SUGGESTIONS", payload: value });
  };

  const setShowSuggestionsList = (value: boolean) => {
    dispatch({ type: "SET_SHOW_SUGGESTION_LIST", payload: value });
  };

  const setLocationSearched = (value: boolean) => {
    dispatch({ type: "SET_LOCATION_SEARCHED", payload: value });
  };

  const setAvailable = (value: boolean) => {
    dispatch({ type: "SET_AVAILABLE_QUERY", payload: value });
  };

  const resetAll = () => {
    dispatch({ type: "RESET_ALL" });
  };

  return {
    searchState,
    actions: {
      setSearchForm,
      setFilterValue,
      setSearchTrigger,
      toogleSortOptions,
      setSortOption,
      setPageQuery,
      setAllSuggestions,
      setShowSuggestionsList,
      setLocationSearched,
      setAvailable,
      resetAll,
    },
  };
}

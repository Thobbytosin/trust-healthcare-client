import { SearchDoctorForm } from "../types/search.types";
import { initialState, searchReducer } from "../reducers/search.reducer";
import { useReducer } from "react";

export function useSearchReducer() {
  const [searchState, dispatch] = useReducer(searchReducer, initialState);

  const actions = {
    setSearchForm: (formType: SearchDoctorForm) => {
      dispatch({ type: "SET_SEARCH_FORM", payload: { ...formType } });
    },

    setFilterValue: (value: string) => {
      dispatch({ type: "SET_FILTER_VALUE", payload: value });
    },

    setSearchTrigger: (value: number) => {
      dispatch({ type: "SET_SEARCH_TRIGGER", payload: value });
    },

    setTypingTrigger: (value: number | boolean) => {
      dispatch({ type: "SET_TYPING_TRIGGER", payload: value });
    },

    setSortBy: (value: string) => {
      dispatch({ type: "SET_SORT_BY", payload: value });
    },

    setPageQuery: (value: number) => {
      dispatch({ type: "SET_PAGE_QUERY", payload: value });
    },

    setAllSuggestions: (value: string[]) => {
      dispatch({ type: "SET_ALL_SUGGESTIONS", payload: value });
    },

    setShowSuggestionsList: (value: boolean) => {
      dispatch({ type: "SET_SHOW_SUGGESTION_LIST", payload: value });
    },

    setUserLocationLoading: (value: boolean) => {
      dispatch({ type: "SET_USER_LOCATION_LOADING", payload: value });
    },

    setUserLocationSearched: (value: boolean) => {
      dispatch({ type: "SET_USER_LOCATION_SEARCHED", payload: value });
    },

    setUserLocation: (value: string) => {
      dispatch({ type: "SET_USER_LOCATION", payload: value });
    },

    setUserLocationError: (value: string) => {
      dispatch({ type: "SET_USER_LOCATION_ERROR", payload: value });
    },

    resetAll: () => {
      dispatch({ type: "RESET_ALL" });
    },
  };

  return {
    searchState,
    actions,
  };
}

import { SearchAction, SearchState } from "../types/all.types";

export const initialState: SearchState = {
  searchForm: { location: undefined, specialization: undefined },
  locationSearched: false,
  filterValue: undefined,
  sortBy: undefined,
  searchQuery: undefined,
  pageQuery: undefined,
  availableQuery: undefined,
  searchTrigger: 0,
  allSuggestions: [],
  showSuggestionList: false,
};

export function searchReducer(state: SearchState, action: SearchAction) {
  switch (action.type) {
    case "SET_SEARCH_FORM":
      return {
        ...state,
        searchForm: { ...state.searchForm, ...action.payload },
      };

    case "SET_LOCATION_SEARCHED":
      return { ...state, locationSearched: action.payload };

    case "SET_FILTER_VALUE":
      return { ...state, filterValue: action.payload };

    case "SET_SORT_BY":
      return { ...state, sortBy: action.payload };

    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_PAGE_QUERY":
      return { ...state, pageQuery: action.payload };
    case "SET_AVAILABLE_QUERY":
      return { ...state, availableQuery: action.payload };
    case "SET_SEARCH_TRIGGER":
      return { ...state, searchTrigger: action.payload };

    case "RESET_SEARCH_FORM":
      return { ...state, searchForm: { location: "", specialization: "" } };

    case "SET_ALL_SUGGESTIONS":
      return { ...state, allSuggestions: action.payload };

    case "SET_SHOW_SUGGESTION_LIST":
      return { ...state, showSuggestionList: action.payload };

    case "RESET_ALL":
      return initialState;

    default:
      return state;
  }
}

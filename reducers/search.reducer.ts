import { SearchAction, SearchState } from "../types/search.types";

export const initialState: SearchState = {
  searchForm: { location: undefined, specialization: undefined },
  userLocationLoading: false,
  userLocationSearched: false,
  userLocation: undefined,
  userLocationError: undefined,
  filterValue: undefined,
  sortBy: undefined,
  searchQuery: undefined,
  pageQuery: undefined,
  allSuggestions: [],
  showSuggestionList: false,
  typingTrigger: false,
};

export function searchReducer(
  state: SearchState,
  action: SearchAction
): SearchState {
  switch (action.type) {
    case "SET_SEARCH_FORM":
      return {
        ...state,
        searchForm: { ...state.searchForm, ...action.payload },
      };

    case "SET_USER_LOCATION_LOADING":
      return { ...state, userLocationLoading: action.payload };

    case "SET_USER_LOCATION_SEARCHED":
      return { ...state, userLocationSearched: action.payload };

    case "SET_USER_LOCATION_ERROR":
      return { ...state, userLocationError: action.payload };

    case "SET_USER_LOCATION":
      return { ...state, userLocation: action.payload };

    case "SET_FILTER_VALUE":
      return { ...state, filterValue: action.payload };

    case "SET_SORT_BY":
      return { ...state, sortBy: action.payload };

    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };

    case "SET_PAGE_QUERY":
      return { ...state, pageQuery: action.payload };

    case "SET_TYPING_TRIGGER":
      return { ...state, typingTrigger: action.payload };

    case "RESET_SEARCH_FORM":
      return { ...state, searchForm: { location: "", specialization: "" } };

    case "SET_ALL_SUGGESTIONS":
      return { ...state, allSuggestions: action.payload };

    case "SET_SHOW_SUGGESTION_LIST":
      return { ...state, showSuggestionList: action.payload };

    case "RESET_ALL":
      return {
        ...initialState,
        userLocation: state.userLocation,
        userLocationError: state.userLocationError,
        userLocationLoading: state.userLocationLoading,
        userLocationSearched: state.userLocationSearched,
      };

    default:
      return state;
  }
}

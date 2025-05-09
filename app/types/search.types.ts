export interface SearchDoctorForm {
  location: string | undefined;
  specialization: string | undefined;
}

export type SearchAction =
  | { type: "SET_SEARCH_FORM"; payload: Partial<SearchDoctorForm | undefined> }
  | { type: "SET_USER_LOCATION_LOADING"; payload: boolean }
  | { type: "SET_USER_LOCATION_SEARCHED"; payload: boolean }
  | { type: "SET_USER_LOCATION"; payload: string | undefined }
  | { type: "SET_USER_LOCATION_ERROR"; payload: string | undefined }
  | { type: "SET_FILTER_VALUE"; payload: string | undefined }
  | { type: "SET_SORT_BY"; payload: string | undefined }
  | { type: "SET_SEARCH_QUERY"; payload: string | undefined }
  | { type: "SET_PAGE_QUERY"; payload: number | undefined }
  | { type: "SET_SEARCH_TRIGGER"; payload: number }
  | { type: "SET_TYPING_TRIGGER"; payload: number | boolean }
  | { type: "RESET_SEARCH_FORM" }
  | { type: "SET_ALL_SUGGESTIONS"; payload: string[] }
  | { type: "RESET_ALL" }
  | { type: "SET_SHOW_SUGGESTION_LIST"; payload: boolean };

export interface SearchState {
  searchForm: SearchDoctorForm;
  userLocationSearched: boolean;
  userLocationLoading: boolean;
  userLocation: string | undefined;
  userLocationError: string | undefined;
  filterValue: string | undefined;
  sortBy: string | undefined;
  searchQuery: string | undefined;
  pageQuery: number | undefined;
  searchTrigger: number;
  allSuggestions: string[];
  showSuggestionList: boolean;
  typingTrigger: number | boolean;
}

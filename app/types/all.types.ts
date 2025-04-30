// backend response type
export interface DoctorsBackendResponse {
  success: boolean;
  message: string;
  doctors: any[];
  resultsPerPage: number;
  totalPages: number;
  page: number;
  limit: number;
  results: number;
}

export interface SearchDoctorForm {
  location: string;
  specialization: string;
}

export type SearchAction =
  | { type: "SET_SEARCH_FORM"; payload: Partial<SearchDoctorForm> }
  | { type: "SET_LOCATION_SEARCHED"; payload: boolean }
  | { type: "TOOGLE_FILTER_OPTIONS" }
  | { type: "TOOGLE_SORT_OPTIONS" }
  | { type: "SET_FILTER_VALUE"; payload: string }
  | { type: "SET_SORT_BY"; payload: string }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_PAGE_QUERY"; payload: number }
  | { type: "SET_AVAILABLE_QUERY"; payload: boolean }
  | { type: "SET_SEARCH_TRIGGER"; payload: number }
  | { type: "RESET_SEARCH_FORM" }
  | { type: "SET_ALL_SUGGESTIONS"; payload: any[] }
  | { type: "RESET_ALL" }
  | { type: "SET_SHOW_SUGGESTION_LIST"; payload: boolean };

export interface SearchState {
  searchForm: SearchDoctorForm;
  locationSearched: boolean;
  showFilterOptions: boolean;
  showSortOptions: boolean;
  filterValue: string;
  sortBy: string;
  searchQuery: string;
  pageQuery: number;
  availableQuery: boolean;
  searchTrigger: number;
  allSuggestions: string[];
  showSuggestionList: boolean;
}

import ToolTip from "../ui/Tooltip";
import { SearchOutlinedIcon } from "@/icons/icons";
import React, { FC, FormEvent, useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useTooltip from "@/hooks/useTooltip";
import { useSearch } from "@/hooks/useSearch";

type Props = {};

const SpecializationForm: FC<Props> = ({}) => {
  const suggestionListRef = useRef<HTMLUListElement>(null);
  const { actions, searchState } = useSearch();
  const {
    setSearchForm,
    setPageQuery,
    setAllSuggestions,
    setShowSuggestionsList,
    resetAll,
    setTypingTrigger,
  } = actions;
  const { searchForm, allSuggestions, showSuggestionList, typingTrigger } =
    searchState;
  const showSpecializationTooltip = useTooltip("specialization");
  const router = useRouter();
  const pathname = usePathname();
  const queryParams = useSearchParams();

  const handlePageParamsChange = (
    type: "specialization",
    parameter: any,
    defaultPageNum = 1
  ) => {
    let newParams = new URLSearchParams(queryParams?.toString());

    if (type === "specialization") {
      newParams = new URLSearchParams();
      newParams.set("page", defaultPageNum.toString());
      newParams.set("specialization", parameter?.toLowerCase());
    }

    router.push(`${pathname}?${newParams}`);
  };

  useEffect(() => {
    resetAll();
  }, []);

  //   close suggestionlist when clicking anywhere
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionListRef.current &&
        !suggestionListRef.current.contains(event.target as Node)
      ) {
        setShowSuggestionsList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  let debounceTimeout: NodeJS.Timeout | null = null;
  // Handle fetch suggestions
  const fetchSuggestions = useCallback((term: string) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(async () => {
      const stored = localStorage.getItem("search_suggestions");
      const suggestions: string[] = stored ? JSON.parse(stored) : [];

      // filter
      const filtered = suggestions.filter((s: string) =>
        s.toLowerCase().includes(term.toLowerCase())
      );

      setAllSuggestions(filtered);
      setShowSuggestionsList(true);
    }, 2000);
  }, []);

  // to fetchSuggestions
  useEffect(() => {
    if (!typingTrigger) return;

    if (
      typeof searchForm.specialization === "string" &&
      searchForm.specialization?.trim()?.length > 0
    ) {
      fetchSuggestions(searchForm.specialization);
    } else {
      setAllSuggestions([]);
      setShowSuggestionsList(false);
    }
  }, [typingTrigger]);

  const handleSuggestionClick = async (suggestion: string) => {
    setShowSuggestionsList(false);

    // Create a fake form submit event
    const form = document.createElement("form");
    const fakeEvent = new Event("submit", { bubbles: true, cancelable: true });
    form.dispatchEvent(fakeEvent);

    handleSubmit(fakeEvent as unknown as FormEvent, true, suggestion);
  };

  const saveSuggestions = (term: string) => {
    const stored = localStorage.getItem("search_suggestions");
    const suggestions: string[] = stored ? JSON.parse(stored) : [];

    if (!suggestions.includes(term)) {
      suggestions.unshift(term);
      localStorage.setItem(
        "search_suggestions",
        JSON.stringify(suggestions.slice(0, 10))
      );
    }
  };
  // search by specialization
  const handleSubmit = async (
    e?: FormEvent,
    clicked = false,
    query?: string
  ) => {
    e?.preventDefault();

    setTypingTrigger(false);

    if (searchForm.specialization?.trim() === "") return;

    setPageQuery(1); // always set page to 1

    if (!clicked) {
      if (searchForm.specialization) {
        handlePageParamsChange("specialization", searchForm.specialization);
        // save to suggestions
        saveSuggestions(searchForm?.specialization);
      }
    } else {
      if (query) {
        setSearchForm({ ...searchForm, specialization: query });
        handlePageParamsChange("specialization", query);

        // save to suggestions
        saveSuggestions(query);
      }
    }
  };

  const currentSpecialization = queryParams.get("specialization");

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="md:w-fit md:flex"
        autoComplete="off"
      >
        {/* specialization */}
        <div className="md:ml-4 mt-3 md:mt-0 relative w-full md:w-[250px] lg:w-[400px] bg-gray-100  border border-gray-200 rounded-md">
          <input
            id="specialization"
            name="specialization"
            aria-label="Specialization"
            data-testid="specialization-input"
            type="text"
            placeholder="Search by Specialization..."
            className=" outline-none bg-transparent h-[41.33px] py-5 px-3 text-text-primary w-full text-sm"
            value={searchForm.specialization ?? ""}
            onChange={(e) => {
              setTypingTrigger(Date.now());
              setSearchForm({
                ...searchForm,
                specialization: e.target.value,
              });

              if (e.target.value.trim() === "") {
                setTypingTrigger(false);
                resetAll();
                router.push(pathname); // removes all search/query params
              }
            }}
          />
          <SearchOutlinedIcon className="text-text-primary absolute right-2 top-2 " />

          <ToolTip
            message="Enter a specialization"
            show={showSpecializationTooltip}
          />

          {showSuggestionList && allSuggestions?.length > 0 && (
            <ul
              ref={suggestionListRef}
              className="absolute bg-[#e8f4fc] mt-1 w-full shadow z-10"
            >
              {allSuggestions?.map((suggestion, i) => (
                <li
                  key={i}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* button */}
        <button
          name="search-form-submit"
          title="search-form-submit"
          type="submit"
          disabled={
            typeof searchForm?.specialization !== "string" ||
            currentSpecialization?.toLowerCase() ===
              searchForm.specialization.toLowerCase().trim()
          }
          className={`mt-4 md:mt-0 md:ml-4 h-[41.33px] w-[150px] lg:w-[231px] text-sm ${
            typeof searchForm?.specialization !== "string" ||
            currentSpecialization?.toLowerCase() ===
              searchForm.specialization.toLowerCase().trim()
              ? "cursor-not-allowed bg-gray-300"
              : "cursor-pointer bg-primary "
          } rounded-md text-center text-white`}
        >
          Search
        </button>
      </form>
    </>
  );
};

export default SpecializationForm;

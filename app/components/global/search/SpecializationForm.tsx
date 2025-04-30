import ToolTip from "../../ui/Tooltip";
import { SearchOutlinedIcon } from "../../../icons/icons";
import { SearchDoctorForm } from "../../../types/all.types";
import React, { FC, FormEvent, RefObject } from "react";

type Props = {
  handleSubmit: (e: FormEvent) => Promise<void>;
  searchForm: SearchDoctorForm;
  currentSpecialization: string;
  setSearchForm: (value: SearchDoctorForm) => void;
  showSpecializationTooltip: boolean;
  showSuggestionList: boolean;
  allSuggestions: string[];
  suggestionListRef: RefObject<HTMLUListElement | null>;
  setShowSuggestionsList: (value: boolean) => void;
};

const SpecializationForm: FC<Props> = ({
  handleSubmit,
  searchForm,
  currentSpecialization,
  setSearchForm,
  showSpecializationTooltip,
  showSuggestionList,
  allSuggestions,
  suggestionListRef,
  setShowSuggestionsList,
}) => {
  const handleSuggestionClick = async (suggestion: string) => {
    setSearchForm({ ...searchForm, specialization: suggestion });
    setShowSuggestionsList(false);

    // Create a fake form submit event
    const form = document.createElement("form");
    const fakeEvent = new Event("submit", { bubbles: true, cancelable: true });
    form.dispatchEvent(fakeEvent);

    await handleSubmit(fakeEvent as unknown as FormEvent);
  };

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
            value={searchForm.specialization || ""}
            onChange={(e) =>
              setSearchForm({ ...searchForm, specialization: e.target.value })
            }
          />
          <SearchOutlinedIcon className="text-text-primary absolute right-2 top-2 " />

          <ToolTip
            message="Enter a specialization"
            show={showSpecializationTooltip}
          />

          {showSuggestionList && allSuggestions.length > 0 && (
            <ul
              ref={suggestionListRef}
              className="absolute bg-[#e8f4fc] mt-1 w-full shadow z-10"
            >
              {allSuggestions.map((suggestion, i) => (
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
            searchForm.specialization === "" ||
            searchForm.specialization.toLowerCase() ===
              currentSpecialization.toLowerCase()
          }
          className={`mt-4 md:mt-0 md:ml-4 h-[41.33px] w-[150px] lg:w-[231px] text-sm ${
            searchForm.specialization === "" ||
            searchForm.specialization.toLowerCase() ===
              currentSpecialization.toLowerCase()
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

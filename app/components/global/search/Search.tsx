"use client";
import { styles } from "../../../styles/styles";
import React, { useState } from "react";
import RevealWrapper from "../RevealWrapper";

type Props = {};

interface FormOptions {
  name: string;
  speciality: string;
}

const Search = (props: Props) => {
  const initialState = { name: "", speciality: "" };
  const [form, setForm] = useState<FormOptions>(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <RevealWrapper>
      <section
        className={`${styles.marginX} xl:-mt-20 md:-mt-40 z-5 mb-10 w-[90%] mx-auto md:w-[70%] lg:w-[75%] xl:w-[70%] bg-white shadow shadow-black/20  rounded-4xl px-4 py-10 lg:p-8  `}
      >
        <h3 className="lg:text-base md:text-sm text-xs mb-2 text-text-primary">
          Find a doctor
        </h3>
        <form>
          <input
            type="text"
            name="name"
            aria-label="Doctor's Name"
            placeholder="Name of Doctor"
            onChange={handleChange}
            className=" bg-[#DEDEDE] w-[160px] md:w-[180px] lg:w-[278px] lg:rounded-xl rounded-lg p-1.5 lg:p-3 lg:text-base text-xs outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 text-[#5B5B5B]"
          />
          <select
            title="Speciality"
            name="speciality"
            aria-label="Doctor's Speciality"
            //   value={form.speciality}
            onChange={handleChange}
            className=" bg-[#dedede] w-[160px] md:w-[180px] lg:w-[278px] lg:rounded-xl rounded-lg p-1.5 lg:p-3 lg:text-base text-xs outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 text-[#5B5B5B] ml-1 md:ml-3"
          >
            <option value="">Select Speciality</option>
            <option className=" bg-white" value="Cardiologist">
              Cardiologist
            </option>
            <option className=" bg-white" value="Dermatologist">
              Dermatologist
            </option>
            <option className=" bg-white" value="Neurologist">
              Neurologist
            </option>
            <option className=" bg-white" value="Pediatrician">
              Pediatrician
            </option>
            <option className=" bg-white" value="Psychiatrist">
              Psychiatrist
            </option>
            <option className=" bg-white" value="Orthopedic Surgeon">
              Orthopedic Surgeon
            </option>
            <option className=" bg-white" value="General Practitioner">
              General Practitioner
            </option>
            <option className=" bg-white" value="Ophthalmologist">
              Ophthalmologist
            </option>
            <option className=" bg-white" value="Dentist">
              Dentist
            </option>
          </select>

          <button
            type="submit"
            className="md:inline block w-[100px] lg:w-[160px] rounded-xl md:ml-6 cursor-pointer p-1.5 lg:p-3 text-white bg-primary text-center hover:opacity-80 transition-all duration-500 lg:text-base text-xs mt-2 md:mt-0"
          >
            Search
          </button>
        </form>
      </section>
    </RevealWrapper>
  );
};

export default Search;

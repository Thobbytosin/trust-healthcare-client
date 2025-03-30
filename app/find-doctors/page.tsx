import React from "react";
import Header from "../components/global/Header";
import { Metadata } from "next";
import FindDoctors from "../components/doctors/FindDoctors";

// SE0
export const metadata: Metadata = {
  title: "Find Certified Doctors & Specialists - Trust Healthcare",
  description:
    "Browse and book appointments with certified doctors and specialists at Trust Healthcare. Explore medical professionals in cardiology, dermatology, pediatrics, and more. Quality care, anytime, anywhere.",
  icons: {
    icon: "/logo.png", //Path relative to /public
    shortcut: "/logo.png",
  },
  keywords:
    "doctors, medical specialists, healthcare professionals, online consultation, cardiologist, dermatologist, pediatrician, surgeon, neurologist, Trust Healthcare",
  authors: [{ name: "Trust Healthcare Team" }],
  alternates: {
    canonical: "https://trusthealthcare.com/doctors", // ✅ Specific to the doctors page!
  },
  openGraph: {
    title: "Meet Our Certified Doctors & Specialists - Trust Healthcare",
    description:
      "Find and consult with expert doctors at Trust Healthcare. Browse specialists in cardiology, dermatology, pediatrics, neurology, and more.",
    url: "https://trusthealthcare.com/doctors",
    siteName: "Trust Healthcare",
    images: [
      {
        url: "/logo.png", // Replace with a specific image for doctors if you have one!
        width: 800,
        height: 600,
        alt: "Trust Healthcare Doctors",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Your Specialist Doctor - Trust Healthcare",
    description:
      "Explore Trust Healthcare's network of certified doctors and specialists. Book your consultation with ease.",
    images: ["/logo.png"],
  },
  metadataBase: new URL("https://trusthealthcare.com"),
};

export default function Doctors() {
  return (
    <>
      <Header activeIndex={2} />

      <FindDoctors />
    </>
  );
}

import { Metadata } from "next";
import React from "react";
import Doctor from "../../../app/components/doctor/Doctor";
import { IDoctor } from "../../../app/store/useDoctorsStore";
import { SERVER_URI } from "../../../app/utils/uri";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

// SE0
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    // set cookie manually since this SSR
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value || "";
    const accessToken = cookieStore.get("access_token")?.value || "";

    // refresh tokens first
    const refreshes = await fetch(`${SERVER_URI}/refresh-tokens`, {
      method: "GET",
      headers: {
        Cookie: `refresh_token=${refreshToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!refreshes.ok) {
      // throw new Error("You are not logged in");
      return {
        title: "Unauthorized | Trust Healthcare",
        description:
          "View doctor details and book appointments at Trust Healthcare.",
        icons: {
          icon: "/logo.png", //Path relative to /public
          shortcut: "/logo.png",
        },
        openGraph: {
          images: [
            {
              url: "/logo.png",
              width: 800,
              height: 600,
              alt: "Trust Healthcare Logo",
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: "Trust Healthcare - Your Trusted Medical Partner",
          description:
            "Get the best medical services, telemedicine consultations, and expert healthcare solutions at Trust Healthcare.",
          images: ["/logo.png"],
        },
      };
    }

    // fetch the doctors
    const res = await fetch(`${SERVER_URI}/get-doctor/${id}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Cookie: `access_token=${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    const doctor: IDoctor = data?.doctor;

    return {
      title: `${doctor?.name} - ${doctor?.specialization[0]} | Trust Healthcare`,
      description: `${doctor?.name} is a certified ${doctor?.specialization[0]} at Trust Healthcare. Book an appointment online and receive expert medical care.`,
      keywords: `doctor, ${doctor?.specialization}, ${doctor?.name}, Trust Healthcare, book appointment, online consultation`,
      authors: [{ name: "Trust Healthcare Team" }],
      icons: {
        icon: "/logo.png", //Path relative to /public
        shortcut: "/logo.png",
      },
      alternates: {
        canonical: `https://trusthealthcare.com/doctors/${doctor?.email}`,
      },
      openGraph: {
        title: `${doctor?.name} - ${doctor?.specialization} | Trust Healthcare`,
        description: `Consult with ${doctor?.name}, an expert ${doctor?.specialization} at Trust Healthcare.`,
        url: `https://trusthealthcare.com/doctors/${doctor?.email}`,
        siteName: "Trust Healthcare",
        images: [
          {
            url: "/logo.png",
            width: 800,
            height: 600,
            alt: "Trust Healthcare Logo",
          },
        ],
        locale: "en_US",
        type: "profile",
      },
      twitter: {
        card: "summary_large_image",
        title: `${doctor?.name} - ${doctor?.specialization} | Trust Healthcare`,
        description: `Book an appointment with ${doctor?.name}, a leading ${doctor?.specialization} at Trust Healthcare.`,
        // images: [doctor.image],
      },
      metadataBase: new URL("https://trusthealthcare.com"),
    };
  } catch (error) {
    console.error("Failed to fetch doctor for metadata:", error);
    return {
      title: "Doctor | Trust Healthcare",
      description:
        "View doctor details and book appointments at Trust Healthcare.",
      icons: {
        icon: "/logo.png", //Path relative to /public
        shortcut: "/logo.png",
      },
      openGraph: {
        images: [
          {
            url: "/logo.png",
            width: 800,
            height: 600,
            alt: "Trust Healthcare Logo",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Trust Healthcare - Your Trusted Medical Partner",
        description:
          "Get the best medical services, telemedicine consultations, and expert healthcare solutions at Trust Healthcare.",
        images: ["/logo.png"],
      },
    };
  }
}

export default async function DoctorPage({ params }: Props) {
  const { id } = await params;

  return <Doctor doctorId={id} />;
}

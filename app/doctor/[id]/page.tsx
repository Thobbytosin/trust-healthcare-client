import { Metadata, ResolvingMetadata } from "next";
import React from "react";
import { cookies } from "next/headers";
import { SERVER_URI } from "@/config/api";
import Doctor from "@/components/doctor/Doctor";
import { fetchDoctor } from "@/lib/fetchDoctor";
import { IDoctor } from "@/types/doctor.types";

type PageProps = {
  params: Promise<{ id: string }>;
};

// generateMetadata is static but can use cookies()
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;

  try {
    const cookieStore = await cookies();
    const consent = cookieStore.get("cookie_consent")?.value;
    const TR_HOST_X = cookieStore.get("TR_HOST_X")?.value;

    const res = await fetch(`${SERVER_URI}/doctor/meta-tags/${id}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Cookie: `tr_host_x=${TR_HOST_X}`,
        "Content-Type": "application/json",
        "x-cookie-consent": consent || "",
      },
    });

    const data = await res.json();
    const doctor: { name: string; specialty: string[] } = data?.tags;

    const title = `${doctor.name} - ${doctor.specialty[0]} | Trust Healthcare`;
    const description = `${doctor.name} is a certified ${doctor.specialty[0]} at Trust Healthcare. Book an appointment online and receive expert medical care.`;

    return {
      title,
      description,
      keywords: `doctor, ${doctor.specialty.join(", ")}, ${
        doctor.name
      }, Trust Healthcare`,
      authors: [{ name: "Trust Healthcare Team" }],
      icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
      },
      alternates: {
        canonical: `https://trusthealthcare.com/doctors/${doctor.name}`,
      },
      openGraph: {
        title,
        description,
        url: `https://trusthealthcare.com/doctors/${doctor.name}`,
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
        title,
        description,
        images: ["/logo.png"],
      },
      metadataBase: new URL("https://trusthealthcare.com"),
    };
  } catch (error) {
    console.log("Failed to fetch metadata for doctor:", error);
    return {
      title: "Doctor | Trust Healthcare",
      description:
        "View doctor details and book appointments at Trust Healthcare.",
      icons: {
        icon: "/logo.png",
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

export default async function DoctorPage({ params }: PageProps) {
  const { id } = await params;
  const doctor: IDoctor | null = await fetchDoctor(id);

  // return <div>Doctor Page</div>;
  return <Doctor doctor={doctor} />;
}

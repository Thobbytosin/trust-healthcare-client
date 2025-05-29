import { Metadata } from "next";
import React from "react";
import Doctor from "../../../app/components/doctor/Doctor";
import { cookies } from "next/headers";
import { SERVER_URI } from "@/config/api";

type Props = {
  params: {
    id: string;
  };
};

// SE0
export async function generateMetadata({
  params,
}: Props): Promise<Metadata | null> {
  try {
    const { id } = await params;
    // set cookie manually since this SSR
    const cookieStore = await cookies();
    const consent = cookieStore.get("cookie_consent")?.value;

    const tr_host_x = cookieStore.get("tr_host_x")?.value;
    // fetch the doctor tags
    const res = await fetch(`${SERVER_URI}/doctor/meta-tags/${id}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Cookie: `tr_host_x=${tr_host_x}`,
        "Content-Type": "application/json",
        "x-cookie-consent": consent || "",
      },
    });

    const data = await res.json();
    const doctor: { name: string; specialty: string[] } = data?.tags;

    return {
      title: `${doctor?.name} - ${doctor?.specialty[0]} | Trust Healthcare`,
      description: `${doctor?.name} is a certified ${doctor?.specialty[0]} at Trust Healthcare. Book an appointment online and receive expert medical care.`,
      keywords: `doctor, ${doctor?.specialty}, ${doctor?.name}, Trust Healthcare, book appointment, online consultation`,
      authors: [{ name: "Trust Healthcare Team" }],
      icons: {
        icon: "/logo.png", //Path relative to /public
        shortcut: "/logo.png",
      },
      alternates: {
        canonical: `https://trusthealthcare.com/doctors/${doctor?.name}`,
      },
      openGraph: {
        title: `${doctor?.name} - ${doctor?.specialty[0]} | Trust Healthcare`,
        description: `Consult with ${doctor?.name}, an expert ${doctor?.specialty[0]} at Trust Healthcare.`,
        url: `https://trusthealthcare.com/doctors/${doctor?.name}`,
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
        title: `${doctor?.name} - ${doctor?.specialty[0]} | Trust Healthcare`,
        description: `Book an appointment with ${doctor?.name}, a leading ${doctor?.specialty[0]} at Trust Healthcare.`,
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

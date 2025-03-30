import { Metadata } from "next";
import DoctorPage from "../../../app/components/doctor/DoctorPage";
import Header from "../../../app/components/global/Header";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

// const fetchDoctorById = (id: string) => {
//   const findDoctor = dummyDoctors?.find(
//     (doctor) => doctor.email === id.split("%").join("@")
//   );

//   if (findDoctor) {
//     return findDoctor;
//   } else {
//     return null;
//   }
// };

// SE0
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   // const doctor = fetchDoctorById(params.id);

//   return {
//     title: `${doctor?.name} - ${doctor?.specialization} | Trust Healthcare`,
//     description: `${doctor?.name} is a certified ${doctor?.specialization} at Trust Healthcare. Book an appointment online and receive expert medical care.`,
//     keywords: `doctor, ${doctor?.specialization}, ${doctor?.name}, Trust Healthcare, book appointment, online consultation`,
//     authors: [{ name: "Trust Healthcare Team" }],
//     alternates: {
//       canonical: `https://trusthealthcare.com/doctors/${doctor?.email}`,
//     },
//     openGraph: {
//       title: `${doctor?.name} - ${doctor?.specialization} | Trust Healthcare`,
//       description: `Consult with ${doctor?.name}, an expert ${doctor?.specialization} at Trust Healthcare.`,
//       url: `https://trusthealthcare.com/doctors/${doctor?.email}`,
//       siteName: "Trust Healthcare",
//       // images: [
//       //   {
//       //     url: doctor?.thumbnail.url || undefined,
//       //     width: 800,
//       //     height: 600,
//       //     alt: `${doctor?.name} - ${doctor?.specialization}`,
//       //   },
//       // ],
//       locale: "en_US",
//       type: "profile",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: `${doctor?.name} - ${doctor?.specialization} | Trust Healthcare`,
//       description: `Book an appointment with ${doctor?.name}, a leading ${doctor?.specialization} at Trust Healthcare.`,
//       // images: [doctor.image],
//     },
//     metadataBase: new URL("https://trusthealthcare.com"),
//   };
// }

const Page = async ({ params }: Props) => {
  return (
    <>
      <Header activeIndex={-1} />

      <DoctorPage />
    </>
  );
};

export default Page;

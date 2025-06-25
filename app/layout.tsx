import { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import AppProvider from "@/providers/AppProvider";
import AuthIntializer from "@/providers/AuthIntializer";
import UserInactivityTracker from "@/providers/UserInactivityTracker";
import { fetchUser } from "@/lib/fetchUser";
import { Comfortaa, Poppins } from "next/font/google";
import ViewportHeightSetter from "@/providers/ViewportHeightSetter";

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "100", "200", "600", "800", "900", "700"],
});

export const metadata: Metadata = {
  title: "Trust Healthcare - Quality Medical Care You Can Rely On",
  description:
    "Trust Healthcare provides top-quality medical care, telemedicine services, and expert consultations. Book an appointment with our certified doctors today.",
  keywords:
    "healthcare, hospital, doctors, medical services, telemedicine, online consultation, patient care, Trust Healthcare",
  icons: {
    icon: "/logo.png", //Path relative to /public
    shortcut: "/logo.png",
  },
  authors: [{ name: "Trust Healthcare Team" }],
  alternates: {
    canonical: "https://trusthealthcare.com",
  },
  openGraph: {
    title: "Trust Healthcare - Your Trusted Medical Partner",
    description:
      "Get the best medical services, telemedicine consultations, and expert healthcare solutions at Trust Healthcare.",
    url: "https://trusthealthcare.com",
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
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trust Healthcare - Your Trusted Medical Partner",
    description:
      "Get the best medical services, telemedicine consultations, and expert healthcare solutions at Trust Healthcare.",
    images: ["/logo.png"],
  },
  metadataBase: new URL("https://trusthealthcare.com"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchUser();

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${comfortaa.variable} ${poppins.variable} min-h-screen`}
      >
        <ViewportHeightSetter />
        <AppProvider>
          <AuthIntializer user={user} />
          <UserInactivityTracker />
          {children}
        </AppProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}

import { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import AppProvider from "./providers/AppProvider";
import AuthIntializer from "./providers/AuthIntializer";
import UserInactivityTracker from "./providers/UserInactivityTracker";

export const metadata: Metadata = {
  title: "Trust Healthcare",
  description: "Book appointments and consult with doctors online.",
  icons: {
    icon: "/logo.png",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className=" font-poppins min-h-screen ">
        <AppProvider>
          <AuthIntializer />
          <UserInactivityTracker />
          {children}
        </AppProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}

import { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import { Toaster } from "sonner";

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
        <QueryProvider>{children}</QueryProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}

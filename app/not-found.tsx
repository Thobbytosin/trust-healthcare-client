import { Metadata } from "next";
import NotFound from "./components/404/NotFound";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Trust Healthcare",
  description:
    "Sorry, the page you are looking for doesn't exist. Please check the URL or go back to the homepage for more information.",
  keywords:
    "404 error, not found, page not found, Trust Healthcare, medical services, hospital, healthcare, online consultation",
  icons: {
    icon: "/logo.png", // Path relative to /public
    shortcut: "/logo.png",
  },
  authors: [{ name: "Trust Healthcare Team" }],
  alternates: {
    canonical: "https://trusthealthcare.com/404",
  },
  openGraph: {
    title: "404 - Page Not Found | Trust Healthcare",
    description:
      "We couldn't find the page you're looking for. Go back to the homepage or explore other parts of our website.",
    url: "https://trusthealthcare.com/404",
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
    title: "404 - Page Not Found | Trust Healthcare",
    description:
      "Oops! The page you were looking for is not available. Visit our homepage for more information.",
    images: ["/logo.png"],
  },
  metadataBase: new URL("https://trusthealthcare.com"),
};

export default async function NotFoundPage() {
  return <NotFound />;
}

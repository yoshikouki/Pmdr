import { PmdrProvider } from "@/components/Timer/PmdrProvider";
import { UserSettingsProvider } from "@/components/user-settings";
import type { Metadata } from "next";
import { Footer } from "./Footer";
import "./globals.css";
import { font } from "./theme";

const APP_NAME = "Pmdr";
const APP_DEFAULT_TITLE = "Pmdr";
const APP_TITLE_TEMPLATE = "%s - Pmdr";
const APP_DESCRIPTION = "Fantastic Pomodoro Timer";
const APP_URL = "https://pmdr.app";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(APP_URL),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserSettingsProvider>
        <body className={font.className}>
          <PmdrProvider>{children}</PmdrProvider>
          <Footer />
        </body>
      </UserSettingsProvider>
    </html>
  );
}

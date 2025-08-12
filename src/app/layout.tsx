import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryProvider } from "./query-provider";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ChangeViewMenu } from "@/components/ChangeViewMenu";
import { PueblosProvider } from "./hooks/PueblosContext";

import "./globals.css";
import "@mantine/core/styles.css";
// ‼️ import notifications styles after core package styles
import "@mantine/notifications/styles.css";
import NavBarWrapper from "@/components/NavBarWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pueblos Magicos",
  description: "The Magical Towns of Mexico",
};

const theme = createTheme({
  /** Put your mantine theme override here */
});

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider defaultColorScheme="auto">
          <Notifications />
          <QueryProvider>
            <PueblosProvider>
              <NavBarWrapper />
              <ChangeViewMenu />
              {children}
            </PueblosProvider>
          </QueryProvider>
        </MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "@/components/NavBar";
import { QueryProvider } from "./query-provider";
import { createTheme, MantineProvider } from "@mantine/core";
import { ChangeViewMenu } from "@/components/ChangeViewMenu";
import { PueblosProvider } from "./hooks/PueblosContext";
import MobileNavBar from "@/components/MobileNavBar";
import isMobileRequest from "@/components/isMobileRequest";

import "./globals.css";
import "@mantine/core/styles.css";

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
  const isMobile = await isMobileRequest();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider defaultColorScheme="auto">
          <QueryProvider>
            <PueblosProvider>
              {isMobile ? <MobileNavBar /> : <NavBar />}
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

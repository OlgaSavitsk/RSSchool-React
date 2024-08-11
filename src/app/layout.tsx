import LayoutComponent from "@components/app-layout";
import React from "react";
import { AppProvider } from "src/store/provider";
import "./global.css";

export const metadata = {
  title: "React-RSSchool",
  description: "React-RSSchool",
};

export default function RootLayout({ children }: { children: React.ReactElement }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <AppProvider>
          <LayoutComponent>{children}</LayoutComponent>
        </AppProvider>
      </body>
    </html>
  );
}

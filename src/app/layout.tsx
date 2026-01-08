import type {Metadata} from "next";
import "./globals.css";
import ToolBar from "../components/toolbar/ToolBar";
import {ToasterProvider} from "../components/ToasterProvider";
import Providers from "../components/Providers";
import {getServerSession} from "next-auth";
import {authOptions} from "./api/auth/[...nextauth]/route";
import BreadCrumbs from "../components/breadCrumbs/BreadCrumbs";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "GitPad",
  icons: {
    icon: "/icons/GitPad.png",
    apple: "/icons/GitPad.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body>
        <Analytics/>
        <Providers session={session}>
          <BreadCrumbs />
          {children}
          <ToolBar />
          <ToasterProvider />
        </Providers>
      </body>
    </html>
  );
}

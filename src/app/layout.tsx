import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "../globals.css";
import NextAuthSessionProvider from "./providers/nextAuthSessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });
const RobotoRegular = Roboto({
  subsets: ["latin"],
  variable: "--font-Roboto-extra-bold",
  display: "swap",
  weight: "500",
});
export const metadata: Metadata = {
  title: "Point Of Sale",
  description: "Generated by prashant Agarwal",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log("session>>>>>>", session);
  return (
    <html lang="en">
      <NextAuthSessionProvider>
        <body className={RobotoRegular.className}>{children}</body>
      </NextAuthSessionProvider>
    </html>
  );
}

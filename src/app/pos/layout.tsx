import DashboardLayout from "@/layouts/DashboardLayout";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

const poppinsRegular = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins-extra-bold",
  display: "swap",
  weight: "500",
});
export const metadata: Metadata = {
  title: "Point Of Sale",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={poppinsRegular.className}>
        <DashboardLayout >{children}</DashboardLayout>
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import {
  ClientOnly,
  LoginModal,
  Navbar,
  RegisterModal,
  RentModal,
} from "./components";
import ToasterProvider from "./provider/ToastProvider";
import getCurrentUser from "./actions/getCurrentUser";
import SearchModal from "./components/Modals/SearchModal";

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <RentModal />
          <LoginModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}

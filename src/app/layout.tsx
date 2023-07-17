import Footer from "../components/Footer";
import Header from "../components/Header";
import { NextAuthProvider } from "../provider/auth";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
});

export const metadata = {
  title: "FWS Trips",
  description: "Sistema de reserva de hospedagem",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <NextAuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}

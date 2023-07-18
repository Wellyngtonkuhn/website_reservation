import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Provider } from "../provider";
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
        <Provider>
          <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}

import { GlobalCategoryProvider } from "@/context/GlobalCategory";
import { NavbarProvider } from "@/context/NavbarContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalCategoryProvider>
      <NavbarProvider>
        <Component {...pageProps} />
      </NavbarProvider>
    </GlobalCategoryProvider>
  );
}

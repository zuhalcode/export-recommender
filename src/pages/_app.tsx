import { GlobalCategoryProvider } from "@/context/GlobalCategoryContext";
import { NavbarProvider } from "@/context/NavbarContext";
import { PredictionProvider } from "@/context/PredictionContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalCategoryProvider>
      <NavbarProvider>
        <PredictionProvider>
          <Component {...pageProps} />
        </PredictionProvider>
      </NavbarProvider>
    </GlobalCategoryProvider>
  );
}

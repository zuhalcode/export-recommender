import { GlobalCategoryProvider } from "@/context/GlobalCategoryContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalCategoryProvider>
      <Component {...pageProps} />
    </GlobalCategoryProvider>
  );
}

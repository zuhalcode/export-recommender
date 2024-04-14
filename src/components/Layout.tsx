import Head from "next/head";
import Navbar from "./Navbar";
import { AppLayoutProps } from "@/types/Types";

const Layout = ({
  children,
  navbar = true,
  title = "Home",
}: AppLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {navbar && <Navbar />}

      <div className="relative w-full bg-neutral">
        <div className="bg-export relative left-0 top-0 z-0 min-h-screen w-full items-center justify-center bg-center ">
          <div className="absolute left-0 top-0 z-10 h-full w-full bg-black bg-opacity-40" />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;

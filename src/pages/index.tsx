import { Layout } from "@/components";
import Input from "@/components/Input";
import { GlobalCategoryContext } from "@/context/GlobalCategoryContext";
import { NavbarContext } from "@/context/NavbarContext";
import { GlobalCategoryContextType, NavbarContextType } from "@/types/Types";
import { useContext, useEffect } from "react";

export default function Home() {
  const context = useContext(
    GlobalCategoryContext,
  ) as GlobalCategoryContextType;

  const navbarContext = useContext(NavbarContext) as NavbarContextType;

  const { category } = context;
  const { setNavbar } = navbarContext;

  useEffect(() => setNavbar(true), [setNavbar]);

  return (
    <Layout>
      <div className="relative top-[20%] z-30 mx-auto flex flex-col items-center justify-center gap-12">
        <div className="mt-24 max-w-2xl text-center text-6xl font-bold text-white">
          Rekomendasi Produk Ekspor Untuk Anda
        </div>

        <div className="w-full">
          <Input filterBy={category} />
        </div>
      </div>
    </Layout>
  );
}

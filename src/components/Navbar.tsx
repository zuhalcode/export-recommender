import { useContext } from "react";

import { motion } from "framer-motion";
import { GlobalCategoryContext } from "@/context/GlobalCategoryContext";
import {
  GlobalCategoryContextType,
  NavbarContextType,
  PredictionContextType,
} from "@/types/Types";
import { NavbarContext } from "@/context/NavbarContext";
import { useRouter } from "next/router";
import { PredictionContext } from "@/context/PredictionContext";

const Navbar = () => {
  const navbarContext = useContext(NavbarContext) as NavbarContextType;
  const context = useContext(
    GlobalCategoryContext,
  ) as GlobalCategoryContextType;

  const predictionContext = useContext(
    PredictionContext,
  ) as PredictionContextType;

  const menus: { name?: string; query?: string; href?: string }[] = [
    { name: "beranda", query: "home", href: "/" },
    { name: "hscode", query: "trademap" },
    { name: "produk", query: "products" },
  ];

  const router = useRouter();
  const { navbar } = navbarContext;
  const { setCategory, category } = context;
  const { setPrediction } = predictionContext;

  const handleChangeCategory = (category: any) => {
    if (category === "home") {
      setCategory("trademap");
      router.push("/");
    } else setCategory(category);
  };

  const handleSetPredictionOnClick = (value: string) => setPrediction(value);

  return (
    <nav className="fixed z-20 w-full bg-gray-700 bg-opacity-70 px-4 py-3 shadow-md transition-all duration-500 dark:bg-primary xl:px-5 xl:py-4">
      <div className="container mx-auto w-full">
        <div className="relative flex justify-between">
          {/* Logo */}
          {/* <Logo /> */}
          <div />
          {/* End Logo */}

          <ul className="hidden items-center justify-between sm:hidden md:flex md:gap-5 lg:gap-24">
            {navbar ? (
              menus.map((menu, index) => (
                <motion.li
                  key={index}
                  className={`flex cursor-pointer flex-col items-center justify-center gap-3 text-white dark:text-neutral`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span
                    className="text-base font-bold uppercase tracking-widest"
                    onClick={() => handleChangeCategory(menu.query)}
                  >
                    {menu.name}
                  </span>
                </motion.li>
              ))
            ) : (
              <motion.li
                className={`flex cursor-pointer flex-col items-center justify-center gap-3 text-white dark:text-neutral`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span
                  className="text-base font-bold uppercase tracking-widest"
                  onClick={() => handleChangeCategory("home")}
                >
                  Beranda
                </span>
              </motion.li>
            )}

            {category === "prediction" && (
              <>
                <motion.li
                  className={`flex cursor-pointer flex-col items-center justify-center gap-3 text-white dark:text-neutral`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSetPredictionOnClick("r")}
                >
                  <span className="text-base font-bold uppercase tracking-widest">
                    R2
                  </span>
                </motion.li>

                <motion.li
                  className={`flex cursor-pointer flex-col items-center justify-center gap-3 text-white dark:text-neutral`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSetPredictionOnClick("y")}
                >
                  <span className="text-base font-bold uppercase tracking-widest">
                    Prediksi
                  </span>
                </motion.li>
              </>
            )}
          </ul>

          <div />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

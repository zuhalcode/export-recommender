import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";

const HomeButton = () => {
  const router = useRouter();
  const handleOnClick = () => router.push("/");
  return (
    <motion.button
      className="w-fit cursor-pointer rounded-md bg-[#5974e1] px-3 py-2 text-center text-sm font-medium text-white transition-all duration-300 hover:bg-[#6280f7]"
      whileTap={{ scale: 0.9 }}
      onClick={handleOnClick}
    >
      Beranda
    </motion.button>
  );
};

export default HomeButton;

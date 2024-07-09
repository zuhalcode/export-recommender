import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";

type ChartButtonProps = { route: string };

const ChartButton = ({ route }: ChartButtonProps) => {
  const router = useRouter();
  const handleOnClick = () => router.push(route);
  return (
    <motion.button
      className="w-fit cursor-pointer rounded-md bg-[#32b43b] px-3 py-2 text-center text-sm font-medium text-white transition-all duration-300 hover:bg-[#3edb48]"
      whileTap={{ scale: 0.9 }}
      onClick={handleOnClick}
    >
      Grafik
    </motion.button>
  );
};

export default ChartButton;

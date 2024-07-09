import { quicksand } from "@/fonts/GoogleFont";
import { motion } from "framer-motion";
import React from "react";

const Test = () => {
  return (
    <div className={`${quicksand.className} bg-[#262939] px-10 pb-0 pt-5`}>
      <div className="flex flex-col items-center justify-center gap-3 pb-10">
        <motion.button
          className="w-fit cursor-pointer rounded-md bg-[#5974e1] px-3 py-2 text-center text-sm font-medium text-white transition-all duration-300 hover:bg-[#6280f7]"
          whileTap={{ scale: 0.9 }}
        >
          Beranda
        </motion.button>
        <h1 className="text-center text-3xl font-medium text-white">
          HSCODE 0301
        </h1>
        <h1 className="text-center text-lg font-semibold text-slate-300">
          All the Lorem Ipsum generators on the Internet tend to repeat
          predefined
        </h1>
      </div>

      <div className="hidden-scroll grid max-h-[25.86rem] grid-cols-3 gap-7 overflow-y-auto overflow-x-hidden pb-3"></div>
    </div>
  );
};

export default Test;

import Logo from "./Logo";

import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const menus: { name?: string; href?: string }[] = [
    { name: "hscode" },
    { name: "produk" },
    { name: "importir" },
  ];

  const scrollSmoothly = (sectionId: string) => {
    if (sectionId === "/") window.scrollTo({ top: 0, behavior: "smooth" });
    else {
      const href = sectionId.replace("#", "");
      const target = document.getElementById(href);
      if (target) {
        const yOffset = target.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({ top: yOffset, behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed z-20 w-full bg-white px-4 py-3 shadow-md transition-all duration-500 dark:bg-primary xl:px-5 xl:py-5">
      <div className="container mx-auto w-full">
        <div className="relative flex justify-between">
          {/* Logo */}
          {/* <Logo /> */}
          <div className=""></div>
          {/* End Logo */}

          <ul className="hidden items-center justify-between sm:hidden md:flex md:gap-5 lg:gap-14">
            {menus.map((menu, index) => (
              <motion.li
                key={index}
                className={`flex cursor-pointer flex-col items-center justify-center gap-3 text-primary dark:text-neutral`}
                // onClick={() => scrollSmoothly(menu.href)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-sm font-bold uppercase tracking-widest">
                  {menu.name}
                </span>
              </motion.li>
            ))}
          </ul>

          <div className=""></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { ReactNode, createContext, useContext, useState } from "react";

type Props = {
  children: ReactNode;
};

type NavbarContextType = {
  navbar: boolean;
  setNavbar: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

const NavbarProvider = ({ children }: Props) => {
  const [navbar, setNavbar] = useState<boolean>(true);

  return (
    <NavbarContext.Provider value={{ navbar: navbar, setNavbar: setNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};

// Custom hook for convenience
export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error(
      "useGlobalCategory must be used within a GlobalCategoryProvider",
    );
  }
  return context;
};

export { NavbarContext, NavbarProvider };

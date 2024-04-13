import { ReactNode, createContext, useState } from "react";

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

export { NavbarContext, NavbarProvider };

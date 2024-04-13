import { ReactNode } from "react";

export type Product = {
  id?: number;
  hscode?: string;
  name: string | undefined;
  desc?: string;
};

export class Importer {
  id?: number;
  name?: string;
  hscode?: string;
  trade_balance?: number;
  quantity_imported?: number;
  value_imported?: number;
  unit_value?: number;
  quantity_unit?: string;
  prediction?: number;
  rSquared?: number;
  MAE?: number;
  RMSE?: number;
}

export type Placeholder = {
  id?: number;
  name: string;
  hscode?: string;
};

export type InputProps = {
  filterBy?: string;
};

export type Trademap = {
  hscode: string;
  name: string;
};

export type NavbarProps = {
  home?: boolean;
};

export type AppLayoutProps = { children: ReactNode; navbar?: boolean };

export type GlobalCategoryContextType = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

export type NavbarContextType = {
  navbar: boolean;
  setNavbar: React.Dispatch<React.SetStateAction<boolean>>;
};

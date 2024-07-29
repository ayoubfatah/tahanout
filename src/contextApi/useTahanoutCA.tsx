import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { CustomersType, Product } from "../Types/types";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

interface TahanoutContextType {
  customerOptions: CustomersType | null;
  setCustomerOptions: React.Dispatch<
    React.SetStateAction<CustomersType | null>
  >;
  productOptions: Product | null;
  setProductOptions: React.Dispatch<React.SetStateAction<Product | null>>;
  paymentMethod: any;
  setPaymentMethod: React.Dispatch<React.SetStateAction<any>>;
  OrderQuantity: number;
  setOrderQuantity: React.Dispatch<React.SetStateAction<number>>;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDarkMode: () => void;
}

interface TahanoutProvider {
  children: ReactNode;
}

const TahanoutContext = createContext<TahanoutContextType | null>(null);

const TahanoutProvider: React.FC<TahanoutProvider> = ({ children }) => {
  const [productOptions, setProductOptions] = useState<Product | null>(null);
  const [customerOptions, setCustomerOptions] = useState<CustomersType | null>(
    null
  );
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [OrderQuantity, setOrderQuantity] = useState(1);
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  // values

  const contextValue: TahanoutContextType = {
    isDarkMode,
    setIsDarkMode,
    customerOptions,
    setCustomerOptions,
    productOptions,
    setProductOptions,
    paymentMethod,
    setPaymentMethod,
    OrderQuantity,
    setOrderQuantity,
    toggleDarkMode,
  };

  return (
    <TahanoutContext.Provider value={contextValue}>
      {children}
    </TahanoutContext.Provider>
  );
};

const useTahanout = (): TahanoutContextType => {
  const context = useContext(TahanoutContext);
  if (context === null) {
    throw new Error("useTahanout must be used within a DarkModeProvider");
  }
  return context;
};

export { TahanoutProvider, useTahanout };

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PageNotFound from "./pages/PageNotFound";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Sourcing from "./pages/Sourcing";
import AppLayout from "./ui/AppLayout";
import { TahanoutProvider, useTahanout } from "./contextApi/useTahanoutCA";
import Order from "./pages/Order";
import ProtectedRoutes from "./ui/ProtectedRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
const isDarkMode = false;
export default function App() {
  return (
    <TahanoutProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }
            >
              <Route index element={<Navigate replace to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/sourcing" element={<Sourcing />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/orders/:id" element={<Order />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/employees" element={<Employees />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={14}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 2500,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px", 
              backgroundColor: isDarkMode ? "#1f2937" : "white",
              color: isDarkMode ? "#e7e8ec" : "black",
            },
          }}
        />
      </QueryClientProvider>
    </TahanoutProvider>
  );
}

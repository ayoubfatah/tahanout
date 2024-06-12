import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="grid h-lvh  grid-cols-[250px_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Sidebar />

      <main className="bg-gray-50 py-10 px-20 overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
}

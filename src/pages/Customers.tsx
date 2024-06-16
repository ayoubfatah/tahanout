import CustomersDetails from "../features/Customers/CustomersTable";
import Button from "../ui/Button";

export default function Customers() {
  return (
    <div className="">
      <div className="flex justify-between mb-8 ">
        <h1 className="text-[24px] font-semibold">Customers</h1>
        <h1 className="text-[24px] font-semibold">buttons</h1>
      </div>
      <CustomersDetails />
    </div>
  );
}

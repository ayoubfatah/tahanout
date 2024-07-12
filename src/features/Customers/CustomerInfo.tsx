import { CustomersType as Customer } from "../../Types/types";

type CustomersType = {
  data: Customer;
};

export default function CustomerInfo({ data: customers }: CustomersType) {
  return (
    <div className="py-5 w-[600px] overflow-x-hidden">
      <div className="py-2 px-3 flex items-center w-full gap-3">
        <span className="w-1/4">Full Name:</span>
        <span className="w-1/2">{customers?.fullName}</span>
      </div>
      <div className="p-3 flex items-center w-full gap-3">
        <span className="w-1/4">Email:</span>
        <span className="w-1/2">{customers?.email}</span>
      </div>
      <div className="p-3 flex items-center w-full gap-3">
        <span className="w-1/4">Phone number:</span>
        <span className="w-1/2">{customers?.nationalId}</span>
      </div>
      <div className="p-3 flex items-center w-full gap-3">
        <span className="w-1/4">Phone number:</span>
        <span className="w-1/2">{customers?.phoneNumber}</span>
      </div>
      <div className="p-3 flex items-center w-full gap-3">
        <span className="w-1/4">Country:</span>
        <span className="w-1/2">{customers?.country}</span>
      </div>
      <div className="p-3 flex items-center w-full gap-3">
        <span className="w-1/4">Region:</span>
        <span className="w-1/2">{customers?.region}</span>
      </div>
      <div className="p-3 flex items-center w-full gap-3">
        <span className="w-1/4">City:</span>
        <span className="w-1/2">{customers?.city}</span>
      </div>
      <div className="p-3 flex items-center w-full gap-3">
        <span className="w-1/4">Zip code:</span>
        <span className="w-1/2">{customers?.zipCode}</span>
      </div>
      <div className="p-3 flex items-start w-full gap-3">
        <span className="w-1/4">Address:</span>
        <span className="w-1/2  flex-grow break-words">
          {customers?.address}
        </span>
      </div>
    </div>
  );
}

import Table from "../../ui/Tabel";
import CustomerActions from "./CustomersActions";
import { CustomersType } from "../../Types/types";

interface CustomerRowProps {
  data: CustomersType;
}

export default function CustomerRow({ data }: CustomerRowProps) {
  return (
    <Table.Row>
      <span className="text-[14px] w-full "> {data?.fullName} </span>
      <span className="text-[14px] w-full "> {data?.email}</span>
      <span className="text-[14px] w-full "> {data?.phoneNumber}</span>
      <span className="text-[14px] w-full "> 🇲🇦 {data?.country} </span>
      <span className="text-[14px] w-full "> {data?.city}</span>
      <span className="text-[14px] w-full "> {data?.nationalId}</span>
      <span className="text-[14px] w-full ">{data?.zipCode}</span>
      <div className="flex justify-end ">
        <CustomerActions data={data} />
      </div>
    </Table.Row>
  );
}

import Table from "../../ui/Tabel";
import CustomerActions from "./CustomersActions";
import { CustomersType } from "../../Types/types";

interface CustomerRowProps {
  data: CustomersType;
}

export default function CustomerRow({ data }: CustomerRowProps) {
  return (
    <Table.Row>
      <span className="text-sm text-gray-700 dark:text-gray-200  w-full ">
        {" "}
        {data?.fullName}{" "}
      </span>
      <span className="text-sm text-gray-700 dark:text-gray-200  w-full ">
        {" "}
        {data?.email}
      </span>
      <span className="text-sm text-gray-700 dark:text-gray-200  w-full ">
        {" "}
        {data?.phoneNumber}
      </span>
      <span className="text-sm text-gray-700 dark:text-gray-200  w-full ">
        {" "}
        🇲🇦 {data?.country}{" "}
      </span>
      <span className="text-sm text-gray-700 dark:text-gray-200  w-full ">
        {" "}
        {data?.city}
      </span>
      <span className="text-sm text-gray-700 dark:text-gray-200  w-full ">
        {" "}
        {data?.nationalId}
      </span>
      <span className="text-sm text-gray-700 dark:text-gray-200  w-full ">
        {data?.zipCode}
      </span>
      <div className="flex justify-end ">
        <CustomerActions data={data} />
      </div>
    </Table.Row>
  );
}

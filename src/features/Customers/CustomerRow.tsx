import Table from "../../ui/Tabel";
import CustomerActions from "../../ui/CustomersActions";
import { CustomersType } from "../../Types/types";

interface CustomerRowProps {
  data: CustomersType;
}

export default function CustomerRow({ data }: CustomerRowProps) {
  return (
    <Table.Row>
      <span> {data?.fullName} </span>
      <span> {data?.email}</span>
      <span> {data?.phoneNumber}</span>
      <span> 🇲🇦 {data?.country} </span>
      <span> {data?.city}</span>
      <span>{data?.zipCode}</span>
      <CustomerActions data={data} />
    </Table.Row>
  );
}

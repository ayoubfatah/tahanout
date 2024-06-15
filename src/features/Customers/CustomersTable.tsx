import Spinner from "../../ui/Spinner";
import Table from "../../ui/Tabel";
import CustomerRow from "./CustomerRow";
import { useCustomers } from "./useCutomers";

export default function CustomersDetails() {
  const { isLoading, customers } = useCustomers();

  if (isLoading) return <Spinner />;

  return (
    <div className="border border-gray-200 rounded-md text-gray-600">
      <Table col="1fr 1.2fr 1.2fr 1fr 1fr 1fr">
        <Table.Header>
          <span className="">Full name</span>
          <span className="">email</span>
          <span className="">Phone number</span>
          <span className="">Country </span>
          <span className="">City</span>
          <span className="">Zip code</span>
        </Table.Header>
        {customers?.map((customer: any) => (
          <CustomerRow key={customer.id || customer.email} data={customer} />
        ))}

        <Table.Footer></Table.Footer>
      </Table>
    </div>
  );
}

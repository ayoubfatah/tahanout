import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Tabel";
import CustomerRow from "./CustomerRow";
import { useCustomers } from "./useCutomers";
import AddCustomerForm from "./AddCustomerForm";
import SearchInput from "../../ui/SearchInput";
import { useState } from "react";
import Filter from "../../ui/Filter";
import { CUSTOMER_TABLE_PAGINATION } from "../../utils/consts";
export default function CustomersDetails() {
  const { isLoading, customers } = useCustomers();
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = CUSTOMER_TABLE_PAGINATION;

  // Get current orders
  const indexOfLastCustomer = currentPage * customersPerPage; // 5
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage; // 0
  const currentCustomers = filteredCustomers?.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) return <Spinner />;
  return (
    <>
      <SearchInput
        items={customers}
        filterKeys={["fullName", "phoneNumber", "nationalId", "email"]}
        onFilter={setFilteredCustomers}
      />

      <div className="border border-gray-200 rounded-md text-gray-600">
        <Table col="1fr 2fr 1.2fr 1fr 1fr 1fr 1fr 20px">
          <Table.Header>
            <span className="">Full name</span>
            <span className="">email</span>
            <span className="">Phone number</span>
            <span className="">Country </span>
            <span className="">City</span>
            <span className="">National ID</span>
            <span className="">Zip code</span>
            <span></span>
          </Table.Header>
          {currentCustomers?.map((customer: any) => (
            <CustomerRow key={customer.id || customer.email} data={customer} />
          ))}
          <Table.Footer
            currentPage={currentPage}
            customersPerPage={customersPerPage}
            totalOrders={filteredCustomers?.length || 0}
            paginate={paginate}
          />
        </Table>
      </div>
      <div className="mt-5">
        <Modal>
          <Modal.Open opens="addCustomer">
            <Button
              text="Add Customer"
              onClick={() => {}}
              bgColor="bg-sky-500"
              textColor="text-white"
              borderColor="border-sky-500"
            />
          </Modal.Open>
          <Modal.Window name="addCustomer">
            <AddCustomerForm onClose={() => {}} onSubmit={() => {}} />
          </Modal.Window>
        </Modal>
      </div>
    </>
  );
}

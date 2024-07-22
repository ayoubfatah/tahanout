import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Tabel";
import CustomerRow from "./CustomerRow";
import { useCustomers } from "./useCutomers";
import AddCustomerForm from "./AddCustomerForm";
import SearchInput from "../../ui/SearchInput";
import { useState } from "react";
import { CUSTOMER_TABLE_PAGINATION } from "../../utils/consts";
import { useTranslation } from "react-i18next";
export default function CustomersDetails() {
  const { isLoading, customers } = useCustomers();
  const customersNewToOld = customers?.sort(
    (a: any, b: any) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const [filteredCustomers, setFilteredCustomers] = useState(customersNewToOld);

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
  const { t } = useTranslation();
  if (isLoading) return <Spinner />;
  return (
    <>
      <SearchInput
        items={customers}
        filterKeys={["fullName", "phoneNumber", "nationalId", "email"]}
        onFilter={setFilteredCustomers}
      />

      <div className="border border-gray-200  dark:border-gray-700  rounded-md ">
        <Table col="1.2fr 2fr 1.3fr 1fr 1fr 1fr 1fr 30px">
          <Table.Header>
            <span className="">{t("fullName")}</span>
            <span className="">{t("email")}</span>
            <span className="">{t("phoneNumber")}</span>
            <span className="">{t("country")} </span>
            <span className="">{t("city")}</span>
            <span className=""> {t("nationalId")}</span>
            <span className="">{t("zipCode")}</span>
            <span></span>
          </Table.Header>
          {currentCustomers?.map((customer: any) => (
            <CustomerRow key={customer.id || customer.email} data={customer} />
          ))}
          <Table.Footer
            currentPage={currentPage}
            itemPerPage={customersPerPage}
            totalOrders={filteredCustomers?.length || 0}
            paginate={paginate}
          />
        </Table>
      </div>
      <div className="mt-5">
        <Modal>
          <Modal.Open opens="addCustomer">
            <Button
              text={t("addCustomer")}
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

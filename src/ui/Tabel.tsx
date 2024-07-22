import React, { createContext, useContext } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

type TableContextType = {
  col: string;
};

const TableContext = createContext<TableContextType>({ col: "" });

type TableProps = {
  col: string;
  children: React.ReactNode;
};

type FooterProps = {
  children: any;
};

function Table({ col, children }: TableProps) {
  return (
    <TableContext.Provider value={{ col }}>{children}</TableContext.Provider>
  );
}

function Header({ children }: FooterProps) {
  const { col } = useContext(TableContext);

  return (
    <div
      role="row"
      className={`uppercase bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-b dark:border-gray-700 py-2 px-3 grid gap-2`}
      style={{ gridTemplateColumns: col }}
    >
      {children}
    </div>
  );
}

function Row({ children }: FooterProps) {
  const { col } = useContext(TableContext);

  return (
    <div
      role="row"
      className={`relative py-2 px-3 grid bg-white dark:bg-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 items-center gap-2`}
      style={{ gridTemplateColumns: col }}
    >
      {children}
    </div>
  );
}

function Footer({ currentPage, itemPerPage, totalOrders, paginate }: any) {
  const { t } = useTranslation();
  const indexOfLastOrder = currentPage * itemPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemPerPage;
  const currentOrdersCount = Math.min(indexOfLastOrder, totalOrders);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 flex items-center justify-between py-2 px-3 text-[14px]">
      <span>
        {t("showing")} {indexOfFirstOrder + 1 * 0 === 0 ? 1 : indexOfFirstOrder}{" "}
        {t("to")} {currentOrdersCount} {t("of")} {totalOrders} {t("results")}
      </span>
      <div className="flex gap-5 font-[500]">
        <button
          className="flex items-center cursor-pointer hover:bg-sky-500 hover:text-white py-1 px-2 rounded-lg"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span>
            <HiChevronLeft />
          </span>
          {t("previous")}
        </button>
        <button
          className="flex items-center cursor-pointer hover:bg-sky-500 hover:text-white py-1 px-2 rounded-lg"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastOrder >= totalOrders}
        >
          {t("next")}
          <span>
            <HiChevronRight />
          </span>
        </button>
      </div>
    </div>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Footer = Footer;
export default Table;

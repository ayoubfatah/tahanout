import React, { createContext, useContext, ReactNode } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { ChildrenType } from "../Types/types";

// Define the type for the context value
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

function Header({ children }: ChildrenType) {
  const { col } = useContext(TableContext);

  return (
    <div
      role="row"
      className={`uppercase bg-gray-100  py-2 px-3 grid  gap-2`}
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
      className={`relative py-2 px-3 grid  bg-white   border-b border-gray-200  items-center gap-2`}
      style={{ gridTemplateColumns: col }}
    >
      {children}
    </div>
  );
}

function Footer() {
  {
    return (
      <div className="bg-gray-50 flex justify-between py-2 px-3 text-[14px] ">
        <span>Showing 1 to 4 of 7 results</span>
        <div className="flex gap-5 font-[500]">
          <button className="flex gap-2 items-center">
            <span>
              {" "}
              <HiChevronLeft />
            </span>{" "}
            Previous{" "}
          </button>
          <button className="flex gap-1 items-center">
            Next{" "}
            <span>
              <HiChevronRight />
            </span>{" "}
          </button>
        </div>
      </div>
    );
  }
}
Table.Header = Header;
Table.Row = Row;
Table.Footer = Footer;
export default Table;

// DABA HADA kaytsma pattern daba hada gharad dyalo hwa ishl lik t9ad 7wayj matalan table

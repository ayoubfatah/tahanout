import React, { createContext, useContext, ReactNode } from "react";

// Define the type for the context value
type TableContextType = {
  col: string;
};

const TableContext = createContext<TableContextType>({ col: "" });

type TableProps = {
  col: string;
  children: ReactNode;
};

type RowProps = {
  children: ReactNode;
};

function Table({ col, children }: TableProps) {
  return (
    <TableContext.Provider value={{ col }}>{children}</TableContext.Provider>
  );
}

function Header({ children }: RowProps) {
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

function Body({ children }: RowProps) {
  const { col } = useContext(TableContext);

  return (
    <div
      role="row"
      className={`relative py-2 px-3 grid    border-b border-gray-200  items-center gap-2`}
      style={{ gridTemplateColumns: col }}
    >
      {children}
    </div>
  );
}

Table.Header = Header;
Table.Body = Body;

export default Table;

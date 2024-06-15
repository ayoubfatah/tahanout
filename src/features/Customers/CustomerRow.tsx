import React from "react";
import Table from "../../ui/Tabel";

export default function CustomerRow({ data }: any) {
  console.log(data);
  return (
    <Table.Row>
      <span> {data?.fullName} </span>
      <span> {data?.email}</span>
      <span> {data?.phoneNumber}</span>
      <span> 🇲🇦 {data?.country} </span>
      <span> {data?.city}</span>
      <span>{data?.zipCode}</span>
    </Table.Row>
  );
}

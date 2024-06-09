import React from "react";
import Products from "./Products";

import Modal from "../ui/Modal";

export default function Orders() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="Products">
          <button>Open</button>
        </Modal.Open>
        <Modal.Window name="Products">
          <Products />
        </Modal.Window>
      </Modal>
    </div>
  );
}

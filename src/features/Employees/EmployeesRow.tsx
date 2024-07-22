import toast from "react-hot-toast";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { EmployeesType } from "../../Types/types";
import Actions from "../../ui/Actions";
import Table from "../../ui/Tabel";
import { useUser } from "../authentication/useUser";
import { useDeleteEmployee } from "./useDeleteEmpoyee";
import Modal from "../../ui/Modal";
import DeleteMsg from "../../ui/DeleteMsg";
import EditEmployeeForm from "./EditEmployeeForm";

type EmployeeProp = {
  employee: EmployeesType;
  t: any;
};
export default function EmployeesRow({ t, employee }: EmployeeProp) {
  const { user } = useUser();
  const { mutate, isDeleting } = useDeleteEmployee();

  function handleDelete() {
    if (user?.email === employee.email) {
      toast.error("You cant delete yourself");
      return;
    }
    mutate(employee.id);
  }
  return (
    <Table.Row key={employee.id}>
      <span className=" text-sm text-gray-700 dark:text-gray-200   ">
        {employee.id}
      </span>
      <span className=" text-sm text-gray-700 dark:text-gray-200   ">
        {employee.fullName}
      </span>
      <span className="text-sm text-gray-700 dark:text-gray-200   ">
        {employee.email}
      </span>
      <span className="text-sm text-gray-700 dark:text-gray-200   ">
        {employee.phoneNumber}
      </span>
      <span
        className={`text-sm ${
          employee.role === "owner" ? "text-yellow-400" : "text-green-500"
        } `}
      >
        {" "}
        {employee.role}
      </span>

      <span className=" flex justify-end cursor-pointer ">
        {employee.role !== "owner" && (
          <Modal>
            <Actions>
              <Actions.Toggle />
              <Actions.Menu>
                <Modal.Open opens="editEmployee">
                  <Actions.Item>
                    <HiPencil size={20} /> {t("Edit")}
                  </Actions.Item>
                </Modal.Open>

                <Modal.Open opens="deleteEmployee">
                  <Actions.Item>
                    <HiTrash size={20} /> {t("Delete")}
                  </Actions.Item>
                </Modal.Open>
              </Actions.Menu>
            </Actions>
            <Modal.Window name="editEmployee">
              <EditEmployeeForm onClose={() => {}} employeeData={employee} />
            </Modal.Window>
            <Modal.Window name="deleteEmployee">
              <DeleteMsg
                deleteFunction={handleDelete}
                data={employee}
                type={t("employee")}
                isDeleting={isDeleting}
                onClose={() => {}}
              />
            </Modal.Window>
          </Modal>
        )}
      </span>
    </Table.Row>
  );
}

import { useState, useEffect } from "react";
import { department, formatDate } from "./utils/Common";
import PaymentStatus from "./Components/payment status/PaymentStatus";
import {
  Select,
  Loader,
  Table,
  Pagination,
  TextInput,
  Button,
  Modal,
} from "@mantine/core";
import UpdateUser from "./Components/UpdateUser";

const Alldata = () => {
  const [userData, setUserData] = useState([]);
  const [departmentStatus, setDepartmentStatus] = useState();
  const [paymentStatus, setPaymentStatus] = useState();
  const [empStatus, setEmpStatus] = useState();
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataLimit, setDataLimit] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [empName, setEmpName] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState();

  const getData = async () => {
    const queryParms = new URLSearchParams();

    if (departmentStatus)
      queryParms.append("departmentStatus", departmentStatus);

    if (paymentStatus) queryParms.append("paymentStatus", paymentStatus);

    if (empStatus) queryParms.append("empStatus", empStatus);

    if (sortOrder) queryParms.append("sortOrder", sortOrder);

    if (currentPage) queryParms.append("currentPage", currentPage);

    if (dataLimit) queryParms.append("dataLimit", dataLimit);

    if (empName) queryParms.append("empName", empName);

    setLoading(true);

    try {
      const responce = await fetch(
        `http://localhost:8000/api/v1/users/get-users?${queryParms.toString()}`
      );

      const data = await responce.json();
      if (!responce.ok) {
        console.log("Data Not Found !", data.message);
        return;
      }
      setUserData(data.allData);
      setTotalCount(data.count || 0);
    } catch (error) {
      console.log("error while getting Data", error);
    } finally {
      setLoading(false);
    }
  };

  const delData = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/del-users/${id}`,
        {
          method: "DELETE",
        }
      );

      await getData();
    } catch (error) {
      console.log("error While Deleting Data -->", error);
    }
  };

  const rows = userData.map((element, ind) => (
    <Table.Tr key={element._id}>
      <Table.Td>{ind + 1}</Table.Td>
      <Table.Td>{element.employe}</Table.Td>
      <Table.Td>
        <div className="flex items-center gap-3">
          {department[element.department]}
          {element.department}
        </div>
      </Table.Td>
      <Table.Td>$ {element.salary}</Table.Td>
      <Table.Td>{formatDate(element.paymentDate)}</Table.Td>
      <Table.Td>{<PaymentStatus status={element.paymentStatus} />}</Table.Td>
      <Table.Td>{element.employeeStatus}</Table.Td>
      <Table.Td>
        <div className="flex justify-center gap-4">
          <Button
            variant="gradient"
            gradient={{ from: "yellow", to: "orange", deg: 90 }}
            radius={"8px"}
            onClick={() => {
              setEditData(element);
              setIsEditModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="gradient"
            gradient={{ from: "red", to: "rgba(84, 14, 14, 1)", deg: 68 }}
            radius={"8px"}
            onClick={() => delData(element?._id)}
          >
            Delete
          </Button>
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  useEffect(() => {
    const timer = setTimeout(() => {
      getData();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [
    departmentStatus,
    paymentStatus,
    empStatus,
    sortOrder,
    currentPage,
    dataLimit,
    empName,
  ]);

  return (
    <>
      <Modal
        size="70%"
        opened={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
        }}
        title="Update User"
      >
        <UpdateUser userData={editData} setIsEditModalOpen={setIsEditModalOpen} getData={getData}/>
      </Modal>

      <div className="flex flex-wrap gap-4 mx-5">
        <TextInput
          className="min-w-[200px] flex-1"
          label="Search Employe"
          placeholder="Enter Employe Name"
          onChange={(e) => setEmpName(e.currentTarget.value)}
        />
        <Select
          className="min-w-[200px] flex-1"
          label="Department"
          placeholder="Select Department"
          data={["Sales", "Support", "Design"]}
          onChange={(val) => setDepartmentStatus(val)}
        />
        <Select
          className="min-w-[200px] flex-1"
          label="Payment Status"
          placeholder="Select Payment Status"
          data={["PENDING", "DONE", "FAILED"]}
          onChange={(val) => setPaymentStatus(val)}
        />
        <Select
          className="min-w-[200px] flex-1"
          label="Employe Status"
          placeholder="Select Employe Status"
          data={["Full-time", "Part-Time", "Contractor"]}
          onChange={(val) => setEmpStatus(val)}
        />
      </div>

      <div className="overflow-x-auto mx-5 mt-5 max-h-[350px]">
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>#</Table.Th>
              <Table.Th>Employe Name</Table.Th>
              <Table.Th>Department</Table.Th>
              <Table.Th>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setSortOrder((prev) => (prev === 1 ? -1 : 1));
                  }}
                >
                  Salary
                </button>
              </Table.Th>
              <Table.Th>Payment Date</Table.Th>
              <Table.Th>Payment Status</Table.Th>
              <Table.Th>Employe Status</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {loading ? (
              <Table.Tr>
                <Table.Td colSpan={7}>
                  <div className="flex justify-center h-50 items-center">
                    <Loader color="rgba(0, 0, 0, 1)" size="lg" type="bars" />
                  </div>
                </Table.Td>
              </Table.Tr>
            ) : (
              rows
            )}
          </Table.Tbody>
        </Table>
      </div>

      <div className="flex flex-wrap justify-between items-center px-5 my-10 gap-4">
        <Pagination
          total={Math.ceil(totalCount / dataLimit)}
          onChange={(e) => setCurrentPage(e)}
        />
        <div className="flex items-center gap-3">
          <label>Show Users</label>
          <Select
            className="w-20"
            placeholder="Pick value"
            data={[
              { value: "5", label: "5" },
              { value: "10", label: "10" },
              { value: "15", label: "15" },
              { value: "20", label: "20" },
              { value: "25", label: "25" },
              { value: "30", label: "30" },
              { value: "35", label: "35" },
              { value: "40", label: "40" },
              { value: "45", label: "45" },
              { value: "50", label: "50" },
            ]}
            withScrollArea={false}
            styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
            onChange={(e) => setDataLimit(e)}
            defaultValue="5"
            allowDeselect={false}
          />
        </div>
      </div>
    </>
  );
};

export default Alldata;

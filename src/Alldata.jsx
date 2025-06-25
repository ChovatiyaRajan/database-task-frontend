import { useState, useEffect } from "react";
import { department, formatDate } from "./utils/Common";
import PaymentStatus from "./Components/payment status/PaymentStatus";
import { Select, Loader, Table, Pagination } from "@mantine/core";

const Alldata = () => {
  const [userData, setUserData] = useState([]);
  const [departmentStatus, setDepartmentStatus] = useState();
  const [paymentStatus, setPaymentStatus] = useState();
  const [empStatus, setEmpStatus] = useState();
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataLimit, setDataLimit] = useState(5);
  const [totalCount,setTotalCount] = useState(0)

  const getData = async () => {
    const queryParms = new URLSearchParams();

    if (departmentStatus)
      queryParms.append("departmentStatus", departmentStatus);

    if (paymentStatus) queryParms.append("paymentStatus", paymentStatus);

    if (empStatus) queryParms.append("empStatus", empStatus);

    if (sortOrder) queryParms.append("sortOrder", sortOrder);

    if (currentPage) queryParms.append("currentPage", currentPage);

    if (dataLimit) queryParms.append("dataLimit", dataLimit);

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
      setTotalCount(data.count || 0)
    } catch (error) {
      console.log("error while getting Data", error);
    } finally {
      setLoading(false);
    }
  };
  const rows = userData.map((element,ind) => (
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
    </Table.Tr>
  ));

  useEffect(() => {
    console.log(departmentStatus);
    getData();
  }, [
    departmentStatus,
    paymentStatus,
    empStatus,
    sortOrder,
    currentPage,
    dataLimit,
  ]);

  console.log(dataLimit);

  return (
    <>
      <div className="flex mx-5 gap-4">
        <Select
          className="w-50"
          label="Department"
          placeholder="Select Department"
          data={["Sales", "Support", "Design"]}
          onChange={(val) => setDepartmentStatus(val)}
        />
        <Select
          className="w-50"
          label="Payment Status"
          placeholder="Select Payment Status"
          data={["PENDING", "DONE", "FAILED"]}
          onChange={(val) => setPaymentStatus(val)}
        />
        <Select
          className="w-50"
          label="Employe Status"
          placeholder="Select Employe Status"
          data={["Full-time", "Part-Time", "Contractor"]}
          onChange={(val) => setEmpStatus(val)}
        />
      </div>
      <div style={{ maxHeight: "400px", overflowY: "auto" }} className="mx-5">
        <Table className="mt-5" striped highlightOnHover withBorder>
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
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {loading ? (
              <Table.Tr>
                <Table.Td colSpan={6}>
                  <div className="flex justify-center h-50 items-center">
                    <Loader color="rgba(0, 0, 0, 1)" size="lg" type="bars" />
                  </div>
                </Table.Td>
              </Table.Tr>
            ) : (
              rows
            )}
          </Table.Tbody>
        </Table>{" "}
      </div>
      <div className="flex justify-between my-10 px-5 items-center ">
        <Pagination total={Math.ceil(totalCount / dataLimit)} onChange={(e) => setCurrentPage(e)} />
        <div className="flex gap-3.5 items-center">
          <label htmlFor="">Show Users</label>
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

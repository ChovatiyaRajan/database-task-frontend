import { useState } from "react";

const UpdateUser = ({ userData, setIsEditModalOpen, getData }) => {
  const [name, setName] = useState(userData.employe || "");
  const [department, setDepartment] = useState(userData.department || "");
  const [salary, setSalary] = useState(userData.salary || "");
  const [paymentDate, setPaymentDate] = useState(
    userData.paymentDate ? userData.paymentDate.split("T")[0] : ""
  );
  const [paymentStatus, setPaymentStatus] = useState(
    userData.paymentStatus || ""
  );
  const [employeeStatus, setEmployeeStatus] = useState(
    userData.employeeStatus || ""
  );

  const newUser = async () => {
    const updatedUSer = {
      employe: name,
      department: department,
      salary: salary,
      paymentDate: paymentDate,
      paymentStatus: paymentStatus,
      employeeStatus: employeeStatus,
    };

    await fetch(
      `http://localhost:8000/api/v1/users/update-users/${userData._id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUSer),
      }
    );
    setIsEditModalOpen(false);
    getData();
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <form className="bg-white p-6 rounded-xl shadow space-y-4 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold"></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="employe"
              required
              placeholder="Name"
              className="border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <select
              name="department"
              className="border p-2 rounded"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option>Sales</option>
              <option>Support</option>
              <option>Design</option>
            </select>
            <input
              type="number"
              name="salary"
              required
              placeholder="Salary"
              className="border p-2 rounded"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            <input
              type="date"
              name="paymentDate"
              required
              className="border p-2 rounded"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
            <select
              name="paymentStatus"
              className="border p-2 rounded"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
            >
              <option>PENDING</option>
              <option>DONE</option>
              <option>FAILED</option>
            </select>
            <select
              name="employeeStatus"
              className="border p-2 rounded"
              value={employeeStatus}
              onChange={(e) => setEmployeeStatus(e.target.value)}
            >
              <option>Full-time</option>
              <option>Part-Time</option>
              <option>Contractor</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={newUser}
            >
              Edit
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateUser;

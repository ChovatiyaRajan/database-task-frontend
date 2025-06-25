import React, { useState, useEffect } from "react";

const Adduser = () => {
  const defaultForm = {
    employe: "",
    department: "Sales",
    salary: "",
    paymentDate: "",
    paymentStatus: "PENDING",
    employeeStatus: "Full-time",
  };

  const [formData, setFormData] = useState(defaultForm);
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    if (editUser) {
      setFormData({
        ...editUser,
        salary: String(editUser.salary),
        paymentDate: editUser.paymentDate.slice(0, 10),
      });
    } else {
      setFormData(defaultForm);
    }
  }, [editUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      salary: Number(formData.salary),
      paymentDate: new Date(formData.paymentDate).toISOString(),
    };

    if (editUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user._id === editUser._id ? { ...finalData, _id: user._id } : user
        )
      );
      setEditUser(null);
    } else {
      setUsers((prev) => [
        ...prev,
        { ...finalData, _id: Date.now().toString() },
      ]);
    }

    setFormData(defaultForm);
  };

  const handleEdit = (user) => setEditUser(user);
  const handleCancel = () => setEditUser(null);

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      setUsers((prev) => prev.filter((user) => user._id !== id));
    }
  };

  async function addData() {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/add-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response?.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // ✅ Clear form fields after successful add
      setFormData(defaultForm);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow space-y-4 max-w-3xl mx-auto"
        >
          <h2 className="text-xl font-semibold">
            {editUser ? "Edit User" : "Add User"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="employe"
              value={formData.employe}
              onChange={handleChange}
              required
              placeholder="Name"
              className="border p-2 rounded"
            />
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option>Sales</option>
              <option>Support</option>
              <option>Design</option>
            </select>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              placeholder="Salary"
              className="border p-2 rounded"
            />
            <input
              type="date"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option>PENDING</option>
              <option>DONE</option>
              <option>FAILED</option>
            </select>
            <select
              name="employeeStatus"
              value={formData.employeeStatus}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option>Full-time</option>
              <option>Part-Time</option>
              <option>Contractor</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={addData}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>
            {editUser && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Adduser;

import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar.jsx";
import { BrowserRouter } from "react-router";
import { Routes } from "react-router";
import { Route } from "react-router";
import Adduser from "./Components/Adduser.jsx";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Alldata from "./Alldata.jsx";

const App = () => {
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
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route path="/add-user" element={<Adduser />} />
              <Route path="/user-data" element={<Alldata />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </>
  );
};

export default App;

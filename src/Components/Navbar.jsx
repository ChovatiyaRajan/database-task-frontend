import React from "react";
import { NavLink, Outlet } from "react-router";

const Navbar = () => {
  return (
    <>
      <nav
        style={{
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
        className="bg-black text-white"
      >
        <NavLink
          className={(e) =>
            e.isActive ? "bg-green-800 px-4 py-3" : "px-4 py-3"
          }
          to="add-user"
        >
          Add User
        </NavLink>
        <NavLink
          className={(e) =>
            e.isActive ? "bg-green-800 px-4 py-3" : "px-4 py-3"
          }
          to="/user-data"
        >
          All Data
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;

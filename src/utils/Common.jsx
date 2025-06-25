import { FaCartShopping } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { FaPenNib } from "react-icons/fa6";


export const department = {
  Sales: <FaCartShopping />,
  Support: <IoCall />,
  Design : <FaPenNib />
};

export const formatDate = (isoDate) => {
  if (!isoDate) return "";

  const date = new Date(isoDate);
  const options = { month: "short", day: "numeric", year: "numeric" };

  return date.toLocaleDateString("en-US", options);
};

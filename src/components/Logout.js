import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { BiPowerOff } from "react-icons/bi";
import "../styles/logout.scss";
import { logoutRoute } from "../utils/APIRoutes";

const Logout = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <button className="button" onClick={handleClick}>
      <BiPowerOff />
    </button>
  );
};

export default Logout;

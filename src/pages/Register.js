import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import logo from "../assets/logo1.png";
import { registerRoute } from "../utils/APIRoutes";

const styles = {
  container:
    "h-[100vh] w-[100vw] flex flex-col justify-center items-center bg-[#131324]",
  form: "flex flex-col gap-8 bg-[#00000076] rounded-2xl py-12 px-20",
  img: "h-20",
  input:
    "w-full bg-transparent p-4 border-2 border-solid border-[#4e0eff] text-white rounded-lg  text-lg focus:outline-none ",
  button:
    "bg-[#997af0] text-white py-4 px-6 border-none font-bold cursor-pointer rounded-lg hover:bg-[#4e0ff]",
  span: "text-white uppercase",
  link: "text-[#4e0eff] font-bold normal-case	no-underline",
};

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <div className="flex items-center gap justify-center text-white uppercase ">
          <img src={logo} alt="" className={styles.img} />
          <h1>JotaChat</h1>
        </div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e)}
          className={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Create user
        </button>

        <span className={styles.span}>
          Already have an account?
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        </span>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Register;

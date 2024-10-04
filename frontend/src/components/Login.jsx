import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {
    const {loginUser} = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const submitForm = () => {
        loginUser(formData.email, formData.password)
    }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col justify-center gap-4 p-8 border rounded-md w-[30%]">
        <h1 className="text-3xl text-center">Login</h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            className="border border-1 rounded-sm p-1"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            className="border border-1 rounded-sm p-1"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex mt-4 items-center justify-center">
          <button className="px-4 py-2 rounded-md bg-black text-white" onClick={submitForm}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

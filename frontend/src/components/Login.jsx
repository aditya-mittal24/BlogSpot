import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
    useEffect(() => {
        document.title = 'Login';
      }, []);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { loginUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const submitForm = async () => {
    let error = validateForm(formData);
    setErrors(error);
    if (!error) {
      let response = await loginUser(formData.email, formData.password);
      console.log(response);
      if (response === null) {
        setErrors("Invalid email or password");
      } else {
        console.log(state)
        if (state){
            navigate(state.from);
        } else {
            navigate('/')
        }
      }
    }
  };

  const validateForm = (data) => {
    let error = "";
    if (!data.email.trim()) {
      error = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      error = "Please enter a valid email";
    } else if (!data.password) {
      error = "Password is required";
    }
    return error;
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col justify-center gap-4 p-8 border rounded-md w-[30%]">
        <h1 className="text-3xl text-center">Login</h1>
        {errors && (
          <div className="p-2 text-red-500 text-sm bg-red-200 rounded-sm">
            {errors}
          </div>
        )}
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
          <button
            className="px-4 py-2 rounded-md bg-black text-white"
            onClick={submitForm}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

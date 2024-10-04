import React from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col justify-center gap-4 p-8 border rounded-md w-[30%]">
        <h1 className="text-3xl">Login</h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            className="border border-1 rounded-sm p-1"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            className="border border-1 rounded-sm p-1"
            type="password"
            name="password"
            id="password"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

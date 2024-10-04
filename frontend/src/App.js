import React from "react";
import { Routes } from "./routes/AppRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App w-full max-w-[1600px] mx-auto">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;

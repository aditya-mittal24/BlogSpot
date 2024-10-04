import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authTokens, setAuthTokens] = useState(null);

  const loginUser = async (email, password) => {
    try {
        console.log("Form submitted")
        const response = await axios.post("http://127.0.0.1:8000/api/login/", {
            email,
            password,
        });
        if (response.status===200){
            const data = response.data;
            // console.log(jwtDecode(data.access))
            setUser(data.user)
            setAuthTokens({access: data.access, refresh: data.refresh})
        }
    } catch (error) {
        console.log("Login failed", error)
    }
  }

  let contextData = {
    loginUser: loginUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authTokens, setAuthTokens] = useState(null);

  const loginUser = async (email, password) => {
    console.log("Form submitted");
    const loggedUser = await axios
      .post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      })
      .then((response) => {
        const data = response.data;
        // console.log(jwtDecode(data.access))
        console.log(data)
        setUser(data.user);
        setAuthTokens(data.tokens);
        localStorage.setItem("authTokens", JSON.stringify(data.tokens));
        return data.user;
      })
      .catch((error) => {
        console.log("Login failed", error);
        return null;
      });
    return loggedUser;
  };

  let contextData = {
    loginUser: loginUser,
    user: user,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

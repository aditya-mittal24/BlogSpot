import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Home() {
  let { name } = useContext(AuthContext);
  return <div className="text-black">Hello {name}!</div>;
}

export default Home;

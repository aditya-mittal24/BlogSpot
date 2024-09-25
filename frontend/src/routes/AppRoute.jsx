import React from "react";
import { Routes, Route } from "react-router-dom";
import NoRouteFound from "./NoRouteFound";
import Home from "../components/Home";

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NoRouteFound />} />
    </Routes>
  );
}

export { AppRoute as Routes };

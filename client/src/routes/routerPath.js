import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./const"; // Make sure this is the correct path to your routes

const RouterPath = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default RouterPath;
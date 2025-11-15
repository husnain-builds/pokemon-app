import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthMonitor from "../hooks/useAuthMonitor";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  useAuthMonitor();
  return <>{children}</>;
};

export default PrivateRoute;

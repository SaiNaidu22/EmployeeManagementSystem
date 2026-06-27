import { jwtDecode } from "jwt-decode";

export const getUser = () => {
  const token =
    localStorage.getItem("token");

  if (!token) return null;

  return jwtDecode(token);
};

export const getRole = () => {
  const user = getUser();
  return user?.role || null;
};

export const getEmployeeId = () => {
  const user = getUser();
  return user?.employeeId || null;
};


export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("employeeId");
};
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL
});
import {
  logoutUser
} from "../utils/auth";

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (
      error.response &&
      error.response.status === 401
    ) {
      localStorage.removeItem("token");

      window.location.href =
        "/login";
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

export const getEmployees =
  async () => {

    const response =
      await api.get(
        "/Employee"
      );

    return response.data;
  };

export const getEmployeesPaged =
  async (
    page,
    pageSize
  ) => {

    const response =
      await api.get(
        `/Employee/paged?page=${page}&pageSize=${pageSize}`
      );

    return response.data;
  };

export const getEmployeeById =
  async (id) => {

    const response =
      await api.get(
        `/Employee/${id}`
      );

    return response.data;
  };

export const addEmployee =
  async (employee) => {

    const response =
      await api.post(
        "/Employee",
        employee
      );

    return response.data;
  };

export const updateEmployee =
  async (
    id,
    employee
  ) => {

    const response =
      await api.put(
        `/Employee/${id}`,
        employee
      );

    return response.data;
  };

export const deleteEmployee =
  async (id) => {

    const response =
      await api.delete(
        `/Employee/${id}`
      );

    return response.data;
  };


  export const getAllLeaves =
  async () => {

    const response =
      await api.get(
        "/Employee/leave"
      );

    return response.data;
  };

export const approveLeave =
  async (id) => {

    const response =
      await api.put(
        `/Employee/leave/approve/${id}`
      );

    return response.data;
  };

export const rejectLeave =
  async (id) => {

    const response =
      await api.put(
        `/Employee/leave/reject/${id}`
      );

    return response.data;
  };
  
export default api;


export const getUsers =
  async () => {

    const response =
      await api.get("/User");

    return response.data;
  };

export const createUser =
  async (user) => {

    const response =
      await api.post(
        "/User",
        user
      );

    return response.data;
  };

export const deleteUser =
  async (id) => {

    await api.delete(
      `/User/${id}`
    );
  };

  export const markAttendance =
  async () => {

    const response =
      await api.post(
        "/Employee/attendance"
      );

    return response.data;
  };

export const getAttendance =
  async () => {

    const response =
      await api.get(
        "/Employee/attendance"
      );

    return response.data;
  };

  export const getAllAttendance =
  async () => {

    const response =
      await api.get(
        "/Employee/attendance/all"
      );

    return response.data;
  };

  export const changePassword =
  async (data) => {

    const response =
      await api.post(
        "/Employee/change-password",
        data
      );

    return response.data;
  };

  export const getDashboard =
  async () => {

    const response =
      await api.get(
        "/Admin/dashboard"
      );

    return response.data;
  };

  export const exportEmployees =
  async () => {

    const response =
      await api.get(
        "/Employee/export",
        {
          responseType:
            "blob"
        }
      );

    return response.data;
  };

  export const exportEmployeesPdf =
  async () => {

    const response =
      await api.get(
        "/Employee/export-pdf",
        {
          responseType:
            "blob"
        }
      );

    return response.data;
  };

  export const resetPassword =
  async (id) => {

    const response =
      await api.post(
        `/User/reset-password/${id}`
      );

    return response.data;
  };

  export const requestPasswordReset =
  async (employeeId) => {

    const response =
      await api.post(
        `/PasswordReset/request?employeeId=${employeeId}`
      );

    return response.data;
  };

  export const approveReset =
  async (id) => {

    const response =
      await api.post(
        `/PasswordReset/approve/${id}`
      );

    return response.data;
  };

  export const getResetRequests =
  async () => {

    const response =
      await api.get(
        "/PasswordReset/pending"
      );

    return response.data;
  };
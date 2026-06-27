import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL
});



const getAuthHeader = () => ({
  headers: {
    Authorization:
      `Bearer ${localStorage.getItem("token")}`
  }
});

// PROFILE
export const getProfile =
  (id) =>
    axios.get(
      `${BASE_URL}/profile/${id}`,
      getAuthHeader()
    );

// UPDATE PROFILE
export const updateProfile =
  (id, data) =>
    axios.put(
      `${BASE_URL}/profile/${id}`,
      data,
      getAuthHeader()
    );

// LEAVE APPLY
export const applyLeave =
  (data) =>
    axios.post(
      `${BASE_URL}/leave`,
      data,
      getAuthHeader()
    );

// LEAVE HISTORY
export const getLeaves =
  (employeeId) =>
    axios.get(
      `${BASE_URL}/leave/${employeeId}`,
      getAuthHeader()
    );

// ATTENDANCE
export const getAttendance =
  (employeeId) =>
    axios.get(
      `${BASE_URL}/attendance/${employeeId}`,
      getAuthHeader()
    );

    export const requestPasswordReset =
  async (employeeId) => {

    const response =
      await api.post(
        `/PasswordReset/request?employeeId=${employeeId}`
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

  export const approveReset =
  async (id) => {

    const response =
      await api.post(
        `/PasswordReset/approve/${id}`
      );

    return response.data;
  };

  
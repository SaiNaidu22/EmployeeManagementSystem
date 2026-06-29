import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Profile
export const getProfile = (id) =>
    api.get(`/Employee/profile/${id}`);

export const updateProfile = (id, data) =>
    api.put(`/Employee/profile/${id}`, data);

// Leave
export const applyLeave = (data) =>
    api.post(`/Employee/leave`, data);

export const getLeaves = (employeeId) =>
    api.get(`/Employee/leave/${employeeId}`);

// Attendance
export const getAttendance = (employeeId) =>
    api.get(`/Employee/attendance/${employeeId}`);

// Password Reset
export const requestPasswordReset = (employeeId) =>
    api.post(`/PasswordReset/request?employeeId=${employeeId}`);

export const getResetRequests = () =>
    api.get(`/PasswordReset/pending`);

export const approveReset = (id) =>
    api.post(`/PasswordReset/approve/${id}`);

export default api;
import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: "http://localhost:5002/student",
});

// 🔥 ADD TOKEN
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔥 GLOBAL ERROR HANDLER (ONLY HERE)
API.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;

    if (status === 401) {
      toast.error("Session expired. Please login again 🔐");
      localStorage.clear();
      window.location.href = "/login";
    }

    else if (status === 403) {
      toast.error("You are not allowed to perform this action 🚫");
    }

    else if (status === 404) {
      toast.error("Student not found ❌");
    }

    else {
      toast.error("Something went wrong ⚠️");
    }

    return Promise.reject(err);
  }
);

// API CALLS
export const getStudents = () => API.get("/getAll");
export const getStudentById = (id) => API.get(`/getById/${id}`);
export const createStudent = (data) => API.post("/create", data);
export const updateStudent = (data) => API.put("/update", data);
export const deleteStudent = (id) => API.delete(`/delete/${id}`);


// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5002/student",
// });

// // ADD INTERCEPTOR
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export const getStudents = () => API.get("/getAll");
// export const getStudentById = (id) => API.get(`/getById/${id}`);
// export const createStudent = (data) => API.post("/create", data);
// export const updateStudent = (data) => API.put("/update", data);
// export const deleteStudent = (id) => API.delete(`/delete/${id}`);























// // import axios from "axios";

// // const API = axios.create({
// //   baseURL: "http://localhost:5002/student",
// // });

// // export const getStudents = () => API.get("/getAll");
// // export const getStudentById = (id) => API.get(`/getById/${id}`);
// // export const createStudent = (data) => API.post("/create", data);
// // export const updateStudent = (data) => API.put("/update", data);
// // export const deleteStudent = (id) => API.delete(`/delete/${id}`);
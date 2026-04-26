import { useState } from "react";
import { loginUser, registerUser } from "../services/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false); // 🔥 TOGGLE

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 LOGIN
  const handleLogin = async () => {
    try {
      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      toast.success("Login Successful 🎉");
      navigate("/students");
    } catch {
      toast.error("Invalid credentials ❌");
    }
  };

  // 🔥 REGISTER
  const handleRegister = async () => {
    try {
      await registerUser(form);
      toast.success("Registered successfully 🎉");

      // auto switch to login
      setIsRegister(false);
    } catch (err) {
      toast.error(err.response?.data || "Registration failed ❌");
    }
  };

  const handleSubmit = () => {
    if (!form.username || !form.password) {
      toast.error("All fields required");
      return;
    }

    if (isRegister) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-[#f8fafc] dark:bg-[#020617]"></div>

      <div className="absolute w-[400px] h-[400px] bg-indigo-400/20 dark:bg-indigo-500/10 blur-[120px] rounded-full top-[-100px] left-[-100px]"></div>

      <div className="absolute w-[300px] h-[300px] bg-pink-400/20 dark:bg-pink-500/10 blur-[120px] rounded-full bottom-[-100px] right-[-100px]"></div>

      {/* FORM */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
        p-8 rounded-2xl shadow-2xl w-96 space-y-4 border border-gray-200 dark:border-gray-800">

        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          {isRegister ? "Register" : "Login"}
        </h2>

        {/* 🔥 TOGGLE LINK */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          {isRegister ? "Already have an account?" : "New user?"}{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </p>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:scale-105 transition"
        >
          {isRegister ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { loginUser } from "../services/auth";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async () => {
//     if (!form.username || !form.password) {
//       toast.error("All fields are required");
//       return;
//     }

//     try {
//       const res = await loginUser(form);

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);

//       toast.success("Login Successful 🎉");

//       navigate("/students");
//     } catch (error) {
//       toast.error("Invalid user credentials");
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      
//       <div className="absolute inset-0 -z-10 bg-[#f8fafc] dark:bg-[#020617]"></div>

      
//       <div className="absolute w-[400px] h-[400px] bg-indigo-400/20 dark:bg-indigo-500/10 blur-[120px] rounded-full top-[-100px] left-[-100px]"></div>

//       <div className="absolute w-[300px] h-[300px] bg-pink-400/20 dark:bg-pink-500/10 blur-[120px] rounded-full bottom-[-100px] right-[-100px]"></div>

//       {/*  FORM */}
//       <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
//         p-8 rounded-2xl shadow-2xl w-96 space-y-4 border border-gray-200 dark:border-gray-800">

//         <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
//           Login
//         </h2>

//         <input
//           name="username"
//           placeholder="Username"
//           onChange={handleChange}
//           className="w-full p-3 rounded-lg 
//           bg-gray-100 dark:bg-gray-800 
//           text-black dark:text-white"
//         />

//         {/* 🔥 PASSWORD WITH TOGGLE */}
//         <div className="relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             className="w-full p-3 rounded-lg 
//             bg-gray-100 dark:bg-gray-800 
//             text-black dark:text-white"
//           />

//           <span
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-3 cursor-pointer"
//           >
//             {showPassword ? "🙈" : "👁️"}
//           </span>
//         </div>

//         <button
//           onClick={handleLogin}
//           className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:scale-105 transition"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }











// import { useState } from "react";
// import { loginUser } from "../services/auth";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async () => {
//     if (!form.username || !form.password) {
//       toast.error("All fields are required");
//       return;
//     }

//     try {
//       const res = await loginUser(form);

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);

//       toast.success("Login Successful 🎉");

//       navigate("/students");
//     } catch (error) {
//       toast.error("Invalid user credentials");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center 
//     bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600">

//       <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-96 space-y-4">
//         <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
//           Login
//         </h2>

//         <input
//           name="username"
//           placeholder="Username"
//           onChange={handleChange}
//           className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800"
//         />

//         {/* 🔥 PASSWORD WITH TOGGLE */}
//         <div className="relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800"
//           />

//           <span
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-3 cursor-pointer"
//           >
//             {showPassword ? "🙈" : "👁️"}
//           </span>
//         </div>

//         <button
//           onClick={handleLogin}
//           className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import { loginUser } from "../services/auth";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async () => {
//     if (!form.username || !form.password) {
//       toast.error("All fields are required");
//       return;
//     }

//     try {
//       const res = await loginUser(form);

//       localStorage.setItem("token", res.data.token);

//       toast.success("Login Successful 🎉");

//       navigate("/students");
//     } catch (error) {
//       toast.error("Invalid user credentials");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center 
//     bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600">

//       <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-96 space-y-4">
//         <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
//           Login
//         </h2>

//         <input
//           name="username"
//           placeholder="Username"
//           onChange={handleChange}
//           className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800"
//         />

//         <button
//           onClick={handleLogin}
//           className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="fixed w-full top-0 z-50 backdrop-blur-md 
      bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-gray-800">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <h1 
          onClick={() => navigate("/")}
          className="text-xl font-bold text-blue-600 dark:text-purple-400 cursor-pointer"
        >
          StudentUI
        </h1>

        <div className="flex items-center space-x-6 font-medium text-black dark:text-white">
          
          {/* ✅ SHOW ONLY IF LOGGED IN */}
          {token && (
            <>
              <Link to="/students">Students</Link>

              {/* 🔥 ADMIN ONLY */}
              {role === "Admin" && (
                <Link to="/create">Add</Link>
              )}
            </>
          )}

          {/* ✅ ALWAYS VISIBLE */}
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>

          {/* 🌗 DARK MODE */}
          <button
            onClick={() => setDark(!dark)}
            className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700"
          >
            {dark ? "🌙" : "☀️"}
          </button>

          {/* 🔐 LOGIN / LOGOUT */}
          {token ? (
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-3 py-1 rounded-lg bg-blue-500 text-white"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}





























// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function Navbar() {
//   const [dark, setDark] = useState(
//     localStorage.getItem("theme") === "dark"
//   );

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (dark) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [dark]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <nav className="fixed w-full top-0 z-50 backdrop-blur-md 
//       bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-gray-800">

//       <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

//         <h1 
//           onClick={() => navigate("/")}
//           className="text-xl font-bold text-blue-600 dark:text-purple-400 cursor-pointer"
//         >
//           StudentUI
//         </h1>

//         <div className="flex items-center space-x-6 font-medium text-black dark:text-white">
          
//           {/* SHOW ONLY IF LOGGED IN */}
//           {token && (
//             <>
//               <Link to="/students">Students</Link>
//               <Link to="/create">Add</Link>
//             </>
//           )}

//           <Link to="/about">About</Link>
//           <Link to="/contact">Contact</Link>

//           {/* 🌗 DARK MODE */}
//           <button
//             onClick={() => setDark(!dark)}
//             className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700"
//           >
//             {dark ? "🌙" : "☀️"}
//           </button>

//           {/* 🔐 LOGIN / LOGOUT */}
//           {token ? (
//             <button
//               onClick={handleLogout}
//               className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
//             >
//               Logout
//             </button>
//           ) : (
//             <button
//   onClick={() => navigate("/login")}
//   className="px-3 py-1 rounded-lg bg-blue-500 text-white"
// >
//   Login
// </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }


























































































// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function Navbar() {
//   const [dark, setDark] = useState(
//     localStorage.getItem("theme") === "dark"
//   );

//   useEffect(() => {
//     if (dark) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [dark]);

//   return (
//     <nav className="fixed w-full top-0 z-50 backdrop-blur-md 
//       bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-gray-800">

//       <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

//         <h1 className="text-xl font-bold text-blue-600 dark:text-purple-400">
//           StudentUI
//         </h1>

//         <div className="flex items-center space-x-6 font-medium text-black dark:text-white">
//           <Link to="/">Home</Link>
//           <Link to="/students">Students</Link>
//           <Link to="/create">Add</Link>
//           <Link to="/about">About</Link>
//           <Link to="/contact">Contact</Link>

//           <button
//             onClick={() => setDark(!dark)}
//             className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700"
//           >
//             {dark ? "🌙" : "☀️"}
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }
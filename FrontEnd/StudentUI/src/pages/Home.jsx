import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Home() {
  const navigate = useNavigate();

  const handleStart = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first 🔐");
      navigate("/login");
    } else {
      navigate("/students");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden 
    text-gray-900 dark:text-white">

      {/*  BACKGROUND (LIGHT + DARK SUPPORT) */}
      <div className="absolute inset-0 -z-10 
        bg-gradient-to-br 
        from-[#eef2ff] via-[#fdf2f8] to-[#e0f2fe] 
        dark:from-[#020617] dark:via-[#0f172a] dark:to-[#020617]">
      </div>

      
      <div className="absolute w-[500px] h-[500px] 
        bg-indigo-400/30 dark:bg-purple-500/20 
        blur-[120px] rounded-full top-[-100px] left-[-100px]">
      </div>

      <div className="absolute w-[400px] h-[400px] 
        bg-pink-400/30 dark:bg-blue-500/20 
        blur-[120px] rounded-full bottom-[-100px] right-[-100px]">
      </div>

      <div className="absolute w-[300px] h-[300px] 
        bg-sky-400/20 dark:bg-pink-500/10 
        blur-[100px] rounded-full top-[50%] left-[50%]">
      </div>

      {/*  CONTENT CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center 
        backdrop-blur-xl 
        bg-white/60 dark:bg-white/5 
        p-10 rounded-2xl shadow-xl 
        border border-white/30 dark:border-white/10"
      >
        <h1 className="text-5xl font-bold mb-4">
          🎓 Student Management System
        </h1>

        <p className="text-lg opacity-80">
          Manage students efficiently
        </p>

        <button
          onClick={handleStart}
          className="mt-6 px-6 py-3 
          bg-black text-white 
          dark:bg-white dark:text-black 
          rounded-xl font-semibold 
          hover:scale-105 transition"
        >
          🚀 Get Started
        </button>
      </motion.div>
    </div>
  );
}









// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function Home() {
//   const navigate = useNavigate();

//   const handleStart = () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       toast.error("Please login first 🔐");
//       navigate("/login");
//     } else {
//       navigate("/students");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center 
//     bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 text-white">

//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-center"
//       >
//         <h1 className="text-5xl font-bold mb-4">
//           🎓 Student Management System
//         </h1>

//         <p className="text-lg opacity-90">
//           Manage students efficiently
//         </p>

//         <button
//           onClick={handleStart}
//           className="mt-6 px-6 py-3 bg-white text-black rounded-xl font-semibold hover:scale-105 transition"
//         >
//           🚀 Get Started
//         </button>
//       </motion.div>
//     </div>
//   );
// }


// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex items-center justify-center 
//     bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 text-white">

//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-center"
//       >
//         <h1 className="text-5xl font-bold mb-4">
//           🎓 Student Management System
//         </h1>

//         <p className="text-lg opacity-90">
//           Manage students efficiently
//         </p>

//         <button
//           onClick={() => navigate("/students")}
//           className="mt-6 px-6 py-3 bg-white text-black rounded-xl font-semibold hover:scale-105 transition"
//         >
//           🚀 Get Started
//         </button>
//       </motion.div>
//     </div>
//   );
// }
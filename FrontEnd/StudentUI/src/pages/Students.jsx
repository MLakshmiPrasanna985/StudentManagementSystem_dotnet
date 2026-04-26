import { useEffect, useState } from "react";
import { getStudents, deleteStudent, getStudentById } from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Students() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  // 🔥 LOAD DATA
  const load = async () => {
    try {
      const res = await getStudents();
      setData(res.data);
    } catch (error) {
      console.error("Load Error:", error);
      // ❌ NO toast here (handled globally)
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ❌ REMOVED second useEffect (IMPORTANT FIX)

  // 🔥 DELETE
  const handleDelete = async (id) => {
    if (role !== "Admin") {
      toast.error("Only Admin can delete 🚫");
      return;
    }

    if (!confirm(`Delete student with ID ${id}?`)) return;

    try {
      await deleteStudent(id);
      toast.success("Deleted successfully");
      load();
    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 SEARCH
  const handleSearch = async () => {
    if (!search) {
      toast.error("Please enter something to search");
      return;
    }

    try {
      // 🔥 SEARCH BY ID
      if (!isNaN(search)) {
        const res = await getStudentById(search);
        setData([res.data]);
      }

      // 🔥 SEARCH BY TEXT
      else {
        if (role === "Admin") {
          const res = await getStudents();

          const filtered = res.data.filter(
            (s) =>
              s.name.toLowerCase().includes(search.toLowerCase()) ||
              s.course.toLowerCase().includes(search.toLowerCase())
          );

          if (filtered.length === 0) {
            toast.error("No matching students found ❌");
          }

          setData(filtered);
        } else {
          toast.error("You can only search by your ID 🔒");
        }
      }

    } catch (error) {
      console.error(error);
      // ❌ NO toast here (interceptor handles it)
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="min-h-screen pt-24 px-6 bg-gray-100 dark:bg-black transition">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            Students
          </h2>

          {role === "Admin" && (
            <button
              onClick={() => navigate("/create")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl shadow hover:scale-105 transition"
            >
              Add Student
            </button>
          )}
        </div>

        {/* SEARCH */}
        <div className="flex gap-3 mb-10">
          <input
            placeholder="🔎Search by ID..."
            className="w-full p-4 rounded-xl border 
              border-gray-300 dark:border-gray-700
              bg-white/70 dark:bg-gray-900/70
              text-black dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            onClick={handleSearch}
            className="px-6 bg-purple-600 text-white rounded-xl"
          >
            Search
          </button>
        </div>

        {data.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No students found
          </p>
        )}

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8">
          {data.map((s) => (
            <div
              key={s.id}
              className="group relative p-6 rounded-2xl 
              bg-white dark:bg-gray-900
              border border-gray-200 dark:border-gray-800
              shadow-md hover:shadow-2xl
              transition-all duration-300
              hover:-translate-y-2"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {s.name}
              </h3>

              <p className="text-gray-500 dark:text-gray-400">
                ID: {s.id}
              </p>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {s.course}
              </p>

              {role === "Admin" && (
                <div className="flex justify-between">
                  <button
                    onClick={() => navigate(`/edit/${s.id}`)}
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    ✏️Edit
                  </button>

                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    🗑️Delete
                  </button>
                </div>
              )}

              <div className="absolute inset-0 pointer-events-none rounded-2xl 
                bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                opacity-0 group-hover:opacity-100 transition duration-300"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}



// import { useEffect, useState } from "react";
// import { getStudents, deleteStudent, getStudentById } from "../services/api";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function Students() {
//   const [data, setData] = useState([]);
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   const load = async () => {
//     try {
//       const res = await getStudents();
//       setData(res.data);
//     } catch (error) {
//       console.error("Load Error:", error);

//       if (error.response) {
//         toast.error("Failed to fetch students");
//       } else if (error.request) {
//         toast.error("API Down - Cannot load students");
//       } else {
//         toast.error("Unexpected error");
//       }
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   useEffect(() => {
//     if (search === "") load();
//   }, [search]);

//   const handleDelete = async (id) => {
//     if (!confirm(`Delete student with ID ${id}?`)) return;

//     try {
//       await deleteStudent(id);
//       toast.success(`Student ${id} deleted`);
//       load();
//     } catch (error) {
//       console.error("Delete Error:", error);

//       if (error.response) {
//         toast.error(`Delete failed: ${error.response.status}`);
//       } else if (error.request) {
//         toast.error("API Down - Cannot delete student");
//       } else {
//         toast.error("Unexpected error");
//       }
//     }
//   };

//   const handleSearch = async () => {
//     if (!search) {
//       toast.error("Enter ID, name or course");
//       return;
//     }

//     try {
//       if (!isNaN(search)) {
//         const res = await getStudentById(search);
//         setData([res.data]);
//       } else {
//         const res = await getStudents();
//         const filtered = res.data.filter(
//           (s) =>
//             s.name.toLowerCase().includes(search.toLowerCase()) ||
//             s.course.toLowerCase().includes(search.toLowerCase())
//         );
//         setData(filtered);
//       }
//     } catch (error) {
//       console.error("Search Error:", error);

//       if (error.response) {
//         toast.error("Student not found");
//       } else if (error.request) {
//         toast.error("API Down - Search not working");
//       } else {
//         toast.error("Unexpected error");
//       }

//       if (error.response?.status === 401) {
//         toast.error("Session expired. Please login again");
//         localStorage.removeItem("token");
//         navigate("/");
//       }
      
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") handleSearch();
//   };

//   return (
//     <div className="min-h-screen pt-24 px-6 bg-gray-100 dark:bg-black transition">
//       <div className="max-w-7xl mx-auto">

//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-10">
//           <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
//             Students
//           </h2>

//           <button
//             onClick={() => navigate("/create")}
//             className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl shadow hover:scale-105 transition"
//           >
//             Add Student
//           </button>
//         </div>

//         {/* SEARCH */}
//         <div className="flex gap-3 mb-10">
//           <input
//             placeholder="🔎Search by ID, Name or Course..."
//             className="w-full p-4 rounded-xl border 
//               border-gray-300 dark:border-gray-700
//               bg-white/70 dark:bg-gray-900/70
//               backdrop-blur-lg
//               text-black dark:text-white
//               focus:ring-2 focus:ring-purple-500 outline-none"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             onKeyDown={handleKeyDown}
//           />

//           <button
//             onClick={handleSearch}
//             className="px-6 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
//           >
//             Search
//           </button>
//         </div>

//         {data.length === 0 && (
//           <p className="text-center text-gray-500 dark:text-gray-400">
//             No students found
//           </p>
//         )}

//         {/* 🔥 PREMIUM CARDS */}
//         <div className="grid md:grid-cols-3 gap-8">
//   {data.map((s) => (
//     <div
//       key={s.id}
//       className="group relative p-6 rounded-2xl 
//       bg-white dark:bg-gray-900
//       border border-gray-200 dark:border-gray-800
//       shadow-md hover:shadow-2xl
//       transition-all duration-300
//       hover:-translate-y-2"
//     >
//       <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
//         {s.name}
//       </h3>

//       <p className="text-gray-500 dark:text-gray-400">
//         ID: {s.id}
//       </p>

//       <p className="text-gray-700 dark:text-gray-300 mb-4">
//         {s.course}
//       </p>

//       <div className="flex justify-between">
//         <button
//           onClick={() => navigate(`/edit/${s.id}`)}
//           className="text-blue-500 hover:text-blue-700 transition"
//         >
//           ✏️Edit
//         </button>

//         <button
//           onClick={() => handleDelete(s.id)}
//           className="text-red-500 hover:text-red-700 transition"
//         >
//           🗑️Delete
//         </button>
//       </div>

//       {/* ✨ GLOW EFFECT BACK */}
//       <div className="absolute inset-0 pointer-events-none rounded-2xl 
//         bg-gradient-to-r from-blue-500/10 to-purple-500/10 
//         opacity-0 group-hover:opacity-100 transition duration-300"
//       />
//     </div>
//   ))}
// </div>

//       </div>
//     </div>
//   );
// }
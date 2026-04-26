import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Students from "./pages/Students";
import CreateStudent from "./pages/CreateStudent";
import EditStudent from "./pages/EditStudent";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black transition">
      <Toaster position="top-right" />

      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* 🔓 BOTH ADMIN + USER */}
          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <Students />
              </ProtectedRoute>
            }
          />

          {/* 🔒 ADMIN ONLY */}
          <Route
            path="/create"
            element={
              <ProtectedRoute roleRequired="Admin">
                <CreateStudent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute roleRequired="Admin">
                <EditStudent />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import Home from "./pages/Home";
// import Students from "./pages/Students";
// import CreateStudent from "./pages/CreateStudent";
// import EditStudent from "./pages/EditStudent";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";

// import ProtectedRoute from "./components/ProtectedRoute";

// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-black transition">
//       <Toaster position="top-right" />

//       <BrowserRouter>
//         <Navbar />

//         <Routes>
//           {/* ✅ HOME FIRST */}
//           <Route path="/" element={<Home />} />

//           {/* ✅ LOGIN PAGE */}
//           <Route path="/login" element={<Login />} />

//           {/* 🔒 PROTECTED */}
//           <Route
//             path="/students"
//             element={
//               <ProtectedRoute>
//                 <Students />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/create"
//             element={
//               <ProtectedRoute>
//                 <CreateStudent />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/edit/:id"
//             element={
//               <ProtectedRoute>
//                 <EditStudent />
//               </ProtectedRoute>
//             }
//           />

//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//         </Routes>

//         <Footer />
//       </BrowserRouter>
//     </div>
//   );
// }









































































































// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import Home from "./pages/Home";
// import Students from "./pages/Students";
// import CreateStudent from "./pages/CreateStudent";
// import EditStudent from "./pages/EditStudent";
// import About from "./pages/About";
// import Contact from "./pages/Contact";

// import ProtectedRoute from "./components/ProtectedRoute";
// import Login from "./pages/Login";

// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-black transition">
//       <Toaster position="top-right" />

//       <BrowserRouter>
//         <Navbar />

//         <Routes>
//           {/* 🔐 LOGIN PAGE */}
//           <Route path="/" element={<Login />} />

//           {/* 🔒 PROTECTED ROUTES */}
//           <Route
//             path="/students"
//             element={
//               <ProtectedRoute>
//                 <Students />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/create"
//             element={
//               <ProtectedRoute>
//                 <CreateStudent />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/edit/:id"
//             element={
//               <ProtectedRoute>
//                 <EditStudent />
//               </ProtectedRoute>
//             }
//           />

//           {/* PUBLIC ROUTES */}
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//         </Routes>

//         <Footer />
//       </BrowserRouter>
//     </div>
//   );
// }




























































// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import Home from "./pages/Home";
// import Students from "./pages/Students";
// import CreateStudent from "./pages/CreateStudent";
// import EditStudent from "./pages/EditStudent";
// import About from "./pages/About";
// import Contact from "./pages/Contact";

// import ProtectedRoute from "./components/ProtectedRoute";
// import Login from "./pages/Login";

// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-black transition">
//       <Toaster position="top-right" />

//       <BrowserRouter>
//         <Navbar />

//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/students" element={<Students />} />
//           <Route path="/create" element={<CreateStudent />} />
//           <Route path="/edit/:id" element={<EditStudent />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//         </Routes>

//         <Footer />
//       </BrowserRouter>
//     </div>
//   );
// }
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function StudentForm({ onSubmit, defaultValues = {}, isEdit = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const submitHandler = (data) => {
    if (isEdit) {
      if (!data.name && !data.rollNumber && !data.course) {
        toast.error("⚠️ Update at least one field");
        return;
      }
    }

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="p-6 max-w-md mx-auto mt-24 
      bg-white dark:bg-gray-900 
      shadow-2xl rounded-2xl space-y-4 
      border border-gray-200 dark:border-gray-800"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
        {isEdit ? "✏️ Edit Student" : "➕ Add Student"}
      </h2>

      {/* NAME */}
      <input
        {...register("name", {
          required: !isEdit && "Name is required",
          pattern: {
            value: /^[A-Za-z ]+$/,
            message: "Only letters allowed",
          },
        })}
        placeholder="Name"
        className="border p-3 w-full rounded-lg bg-gray-100 dark:bg-gray-800"
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      {/* ROLL NUMBER */}
      <input
        {...register("rollNumber", {
          required: !isEdit && "Roll number required",
          pattern: {
            value: /^[A-Za-z0-9]+$/,
            message: "Only letters and numbers",
          },
        })}
        placeholder="Roll Number"
        className="border p-3 w-full rounded-lg bg-gray-100 dark:bg-gray-800"
      />
      {errors.rollNumber && (
        <p className="text-red-500 text-sm">{errors.rollNumber.message}</p>
      )}

      {/* COURSE */}
      <input
        {...register("course", {
          required: !isEdit && "Course is required",
        })}
        placeholder="Course"
        className="border p-3 w-full rounded-lg bg-gray-100 dark:bg-gray-800"
      />
      {errors.course && (
        <p className="text-red-500 text-sm">{errors.course.message}</p>
      )}

      {/* BUTTON */}
      <button
        className="w-full py-3 rounded-lg 
        bg-gradient-to-r from-blue-500 to-purple-600 
        text-white font-semibold 
        hover:scale-105 transition"
      >
        {isEdit ? "Update Student" : "Create Student"}
      </button>
    </form>
  );
}



















































































































// import { useForm } from "react-hook-form";

// export default function StudentForm({ onSubmit, defaultValues = {}, isEdit = false }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ defaultValues });

//   const submitHandler = (data) => {
//     if (isEdit) {
//       if (!data.name && !data.rollNumber && !data.course) {
//         alert("Update at least one field");
//         return;
//       }
//     }

//     onSubmit(data);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(submitHandler)}
//       className="p-6 max-w-md mx-auto mt-24 bg-white dark:bg-gray-900 shadow-xl rounded-2xl space-y-4"
//     >
//       <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
//         Student Form
//       </h2>

//       <input
//         {...register("name", {
//           required: !isEdit && "Name is required",
//           pattern: {
//             value: /^[A-Za-z ]+$/,
//             message: "Only letters allowed",
//           },
//         })}
//         placeholder="Name"
//         className="border p-3 w-full rounded-lg bg-gray-100 dark:bg-gray-800"
//       />
//       <p className="text-red-500">{errors.name?.message}</p>

//       <input
//         {...register("rollNumber", {
//           required: !isEdit && "Roll number required",
//           pattern: {
//             value: /^[A-Za-z0-9]+$/,
//             message: "Only letters and numbers",
//           },
//         })}
//         placeholder="Roll Number"
//         className="border p-3 w-full rounded-lg bg-gray-100 dark:bg-gray-800"
//       />
//       <p className="text-red-500">{errors.rollNumber?.message}</p>

//       <input
//         {...register("course", {
//           required: !isEdit && "Course is required",
//         })}
//         placeholder="Course"
//         className="border p-3 w-full rounded-lg bg-gray-100 dark:bg-gray-800"
//       />
//       <p className="text-red-500">{errors.course?.message}</p>

//       <button className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
//         Submit
//       </button>
//     </form>
//   );
// }
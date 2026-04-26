import StudentForm from "../components/StudentForm";
import { createStudent } from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateStudent() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createStudent(data);

      toast.success("Student created successfully");
      navigate("/students");

    } catch (error) {
      console.error("Create Error:", error);

      if (error.response) {
        toast.error(`Failed: ${error.response.status}`);
      } else if (error.request) {
        toast.error("API Down - Cannot create student");
      } else {
        toast.error("Unexpected error");
      }
    }
  };

  return <StudentForm onSubmit={handleSubmit} isEdit={false} />;
}
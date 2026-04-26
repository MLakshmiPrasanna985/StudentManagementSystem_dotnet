import { useEffect, useState } from "react";
import StudentForm from "../components/StudentForm";
import { getStudentById, updateStudent } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function EditStudent() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getStudentById(id)
      .then(res => setData(res.data))
      .catch((error) => {
        console.error("Fetch Error:", error);

        if (error.response) {
          toast.error("Student not found");
        } else if (error.request) {
          toast.error("API Down - Cannot fetch student");
        } else {
          toast.error("Unexpected error");
        }
      });
  }, [id]);

  const handleSubmit = async (updated) => {
    try {
      const finalData = {
        id: parseInt(id),
        name: updated.name || data.name,
        rollNumber: updated.rollNumber || data.rollNumber,
        course: updated.course || data.course,
      };

      await updateStudent(finalData);

      toast.success("Student updated successfully");
      navigate("/students");

    } catch (error) {
      console.error("Update Error:", error);

      if (error.response) {
        toast.error(`Update failed: ${error.response.status}`);
      } else if (error.request) {
        toast.error("API Down - Cannot update student");
      } else {
        toast.error("Unexpected error");
      }
    }
  };

  return (
    <StudentForm
      onSubmit={handleSubmit}
      defaultValues={data}
      isEdit={true}
    />
  );
}
using StudentsRepository.Models;

namespace StudentsRepository.Services
{
    public interface IStudentManager
    {
        bool CreateStudent(Student student);
        List<Student> GetAllStudents();
        Student GetStudentById(int id);
        bool UpdateStudent(Student student);
        bool DeleteStudent(int id);
    }
}
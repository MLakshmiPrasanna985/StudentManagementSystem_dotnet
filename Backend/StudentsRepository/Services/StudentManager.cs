using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using StudentsRepository.Data;
using StudentsRepository.Models;
using StudentsRepository.Exceptions;

namespace StudentsRepository.Services
{
    public class StudentManager : IStudentManager
    {
        private readonly StudentDbContext context;

        public StudentManager(StudentDbContext _context)
        {
            context = _context;
        }

        public bool CreateStudent(Student student)
        {
            try
            {
                if (student == null)
                    throw new InvalidStudentDataException("Student data required");

                if (string.IsNullOrEmpty(student.Name))
                    throw new InvalidStudentDataException("Student name required");

                var result = context.Database.ExecuteSqlRaw(
                    "EXEC sp_CreateStudent @Name, @RollNumber, @Course",
                    new SqlParameter("@Name", student.Name),
                    new SqlParameter("@RollNumber", student.RollNumber),
                    new SqlParameter("@Course", student.Course)
                );

                return result > 0;
            }
            catch (InvalidStudentDataException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Exception("Error creating student", ex);
            }
        }

        public List<Student> GetAllStudents()
        {
            return context.Students
                .FromSqlRaw("EXEC sp_GetAllStudents")
                .ToList();
        }

        public Student GetStudentById(int id)
        {
            try
            {
                if (id <= 0)
                    throw new InvalidStudentDataException("Invalid ID");

                var student = context.Students
                    .FromSqlRaw("EXEC sp_GetStudentById @Id",
                        new SqlParameter("@Id", id))
                    .AsEnumerable()
                    .FirstOrDefault();

                if (student == null)
                    throw new StudentNotFoundException("Student not found");

                return student;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool UpdateStudent(Student student)
        {
            var result = context.Database.ExecuteSqlRaw(
                "EXEC sp_UpdateStudent @Id, @Name, @RollNumber, @Course",
                new SqlParameter("@Id", student.Id),
                new SqlParameter("@Name", student.Name),
                new SqlParameter("@RollNumber", student.RollNumber),
                new SqlParameter("@Course", student.Course)
            );

            return result > 0;
        }

        public bool DeleteStudent(int id)
        {
            var result = context.Database.ExecuteSqlRaw(
                "EXEC sp_DeleteStudent @Id",
                new SqlParameter("@Id", id)
            );

            return result > 0;
        }
    }
}
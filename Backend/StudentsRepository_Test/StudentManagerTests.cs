using Microsoft.VisualStudio.TestTools.UnitTesting;
using StudentsRepository.Services;
using StudentsRepository.Models;
using StudentsRepository.Exceptions;

namespace StudentsRepository_Test
{
    [TestClass]
    public class StudentManagerTests
    {
        //  NULL STUDENT
        [TestMethod]
        public void CreateStudent_Null_ShouldThrowException()
        {
            var manager = new StudentManager(null!);

            Assert.Throws<InvalidStudentDataException>(() =>
                manager.CreateStudent(null!));
        }

        //  EMPTY NAME
        [TestMethod]
        public void CreateStudent_EmptyName_ShouldThrowException()
        {
            var manager = new StudentManager(null!);

            var student = new Student { Name = "" };

            Assert.Throws<InvalidStudentDataException>(() =>
                manager.CreateStudent(student));
        }

        //  INVALID ID
        [TestMethod]
        public void GetStudentById_InvalidId_ShouldThrowException()
        {
            var manager = new StudentManager(null!);

            Assert.Throws<InvalidStudentDataException>(() =>
                manager.GetStudentById(-1));
        }
    }
}
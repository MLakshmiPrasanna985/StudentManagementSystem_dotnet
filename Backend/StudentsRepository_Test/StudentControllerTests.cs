using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using StudentsRepository.Controllers;
using StudentsRepository.Services;
using StudentsRepository.Models;
using StudentsRepository.Exceptions;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace StudentsRepository_Test
{
    [TestClass]
    public class StudentControllerTests
    {
        private Mock<IStudentManager> mockManager = null!;
        private StudentController controller = null!;

        [TestInitialize]
        public void Setup()
        {
            mockManager = new Mock<IStudentManager>();
            controller = new StudentController(mockManager.Object);
        }

        //  CREATE - SUCCESS
        [TestMethod]
        public void Create_ValidStudent_ReturnsOk()
        {
            var student = new Student { Name = "Prasanna" };

            mockManager.Setup(m => m.CreateStudent(student)).Returns(true);

            var result = controller.Create(student);

            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        //  CREATE - INVALID
        [TestMethod]
        public void Create_InvalidStudent_ReturnsBadRequest()
        {
            mockManager
                .Setup(m => m.CreateStudent(null!))
                .Throws(new InvalidStudentDataException("Invalid"));

            var result = controller.Create(null!);

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        //  GET ALL
        [TestMethod]
        public void GetAll_ReturnsStudentList()
        {
            var students = new List<Student>
            {
                new Student { Id = 1, Name = "A" },
                new Student { Id = 2, Name = "B" }
            };

            mockManager.Setup(m => m.GetAllStudents()).Returns(students);

            var result = controller.GetAll() as OkObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual(2, ((List<Student>)result.Value).Count);
        }

        //  GET BY ID - SUCCESS
        [TestMethod]
        public void GetById_ValidId_ReturnsOk()
        {
            var student = new Student { Id = 1, Name = "Test" };

            mockManager.Setup(m => m.GetStudentById(1)).Returns(student);

            var result = controller.GetById(1);

            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        //  GET BY ID - INVALID
        [TestMethod]
        public void GetById_InvalidId_ReturnsBadRequest()
        {
            mockManager
                .Setup(m => m.GetStudentById(-1))
                .Throws(new InvalidStudentDataException("Invalid"));

            var result = controller.GetById(-1);

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        // 🔹 GET BY ID - NOT FOUND
        [TestMethod]
        public void GetById_NotFound_ReturnsNotFound()
        {
            mockManager
                .Setup(m => m.GetStudentById(1))
                .Throws(new StudentNotFoundException("Not found"));

            var result = controller.GetById(1);

            Assert.IsInstanceOfType(result, typeof(NotFoundObjectResult));
        }

        //  UPDATE - SUCCESS
        [TestMethod]
        public void Update_ValidStudent_ReturnsOk()
        {
            var student = new Student { Id = 1, Name = "Updated" };

            mockManager.Setup(m => m.UpdateStudent(student)).Returns(true);

            var result = controller.Update(student);

            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        //  UPDATE - FAILURE
        [TestMethod]
        public void Update_InvalidStudent_ReturnsBadRequest()
        {
            var student = new Student { Id = 1 };

            mockManager.Setup(m => m.UpdateStudent(student)).Returns(false);

            var result = controller.Update(student);

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        //  DELETE - SUCCESS
        [TestMethod]
        public void Delete_ValidId_ReturnsOk()
        {
            mockManager.Setup(m => m.DeleteStudent(1)).Returns(true);

            var result = controller.Delete(1);

            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        //  DELETE - FAILURE
        [TestMethod]
        public void Delete_InvalidId_ReturnsBadRequest()
        {
            mockManager.Setup(m => m.DeleteStudent(1)).Returns(false);

            var result = controller.Delete(1);

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }
    }
}
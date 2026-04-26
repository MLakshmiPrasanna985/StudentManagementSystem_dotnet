using Microsoft.AspNetCore.Mvc;
using StudentsRepository.Models;
using StudentsRepository.Services;

namespace StudentsRepository.Controllers
{
    [ApiController]
    [Route("student")]
    public class StudentController : ControllerBase
    {
        private readonly IStudentManager manager;

        public StudentController(IStudentManager studentManager)
        {
            manager = studentManager;
        }

        // CREATE STUDENT
        [HttpPost("create")]
        public IActionResult Create(Student student)
        {
            var result = manager.CreateStudent(student);
            return result ? Ok("Student Created") : BadRequest();
        }

        // GET ALL STUDENTS 
        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            var students = manager.GetAllStudents();
            return Ok(students);
        }

        // GET BY ID
        [HttpGet("getById/{id}")]
        public IActionResult GetById(int id)
        {
            var student = manager.GetStudentById(id);

            if (student == null)
                return NotFound("Student not found");

            return Ok(student);
        }

        // UPDATE
        [HttpPut("update")]
        public IActionResult Update(Student student)
        {
            var result = manager.UpdateStudent(student);
            return result ? Ok("Updated") : BadRequest();
        }

        // DELETE
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            var result = manager.DeleteStudent(id);
            return result ? Ok("Deleted") : BadRequest();
        }
    }
}

//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using StudentsRepository.Exceptions;
//using StudentsRepository.Models;
//using StudentsRepository.Services;
//using System.Security.Claims;

//namespace StudentsRepository.Controllers
//{
//    [Authorize]
//    [ApiController]
//    [Route("student")]
//    public class StudentController : ControllerBase
//    {
//        private readonly IStudentManager manager;

//        public StudentController(IStudentManager studentManager)
//        {
//            manager = studentManager;
//        }

//        // ADMIN ONLY
//        [Authorize(Roles = "Admin")]
//        [HttpPost("create")]
//        public IActionResult Create(Student student)
//        {
//            var result = manager.CreateStudent(student);
//            return result ? Ok("Student Created") : BadRequest();
//        }

//        //  ADMIN AND USER 
//        [Authorize(Roles = "Admin,User")]
//        [HttpGet("getAll")]
//        public IActionResult GetAll()
//        {
//            var role = User.FindFirst(ClaimTypes.Role)?.Value;
//            var userId = User.FindFirst("UserId")?.Value;

//            if (role == "Admin")
//            {
//                return Ok(manager.GetAllStudents());
//            }

//            // USER → return only their own student
//            if (role == "User")
//            {
//                var student = manager.GetStudentById(Convert.ToInt32(userId));

//                if (student == null)
//                    return NotFound("Student not found");

//                return Ok(new List<Student> { student });
//            }

//            return Forbid();
//        }

//        //  USER ONLY
//        [Authorize(Roles = "Admin,User")]
//        [HttpGet("getById/{id}")]
//        public IActionResult GetById(int id)
//        {
//            var role = User.FindFirst(ClaimTypes.Role)?.Value;
//            var userId = User.FindFirst("UserId")?.Value;

//            // ADMIN → can access ANY student
//            if (role == "Admin")
//            {
//                var student = manager.GetStudentById(id);
//                if (student == null)
//                    return NotFound("Student not found");

//                return Ok(student);
//            }

//            // 🔥 USER → only own data
//            if (role == "User")
//            {
//                if (userId != id.ToString())
//                    return StatusCode(403, "You can only access your own data");

//                var student = manager.GetStudentById(id);
//                if (student == null)
//                    return NotFound("Student not found");

//                return Ok(student);
//            }

//            return Forbid();
//        }

//        // ADMIN ONLY
//        [Authorize(Roles = "Admin")]
//        [HttpPut("update")]
//        public IActionResult Update(Student student)
//        {
//            var result = manager.UpdateStudent(student);
//            return result ? Ok("Updated") : BadRequest();
//        }

//        //  ADMIN ONLY
//        [Authorize(Roles = "Admin")]
//        [HttpDelete("delete/{id}")]
//        public IActionResult Delete(int id)
//        {
//            var result = manager.DeleteStudent(id);
//            return result ? Ok("Deleted") : BadRequest();
//        }
//    }
//}




































































































































































































//using Microsoft.AspNetCore.Mvc;
//using StudentsRepository.Models;
//using StudentsRepository.Services;
//using StudentsRepository.Exceptions;

//using Microsoft.AspNetCore.Authorization;


//namespace StudentsRepository.Controllers
//{
//    [Authorize]
//    [ApiController]
//    [Route("student")]

//    public class StudentController : ControllerBase
//    {
//        private readonly IStudentManager manager;

//        public StudentController(IStudentManager studentManager)
//        {
//            manager = studentManager;
//        }

//        //  CREATE
//        [HttpPost("create")]
//        public IActionResult Create(Student student)
//        {
//            try
//            {
//                var result = manager.CreateStudent(student);

//                return result
//                    ? Ok("Student Created Successfully")
//                    : BadRequest("Failed to create student");
//            }
//            catch (InvalidStudentDataException ex)
//            {
//                return BadRequest(ex.Message);
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, ex.Message);
//            }
//        }

//        //  GET ALL
//        [HttpGet("getAll")]
//        public IActionResult GetAll()
//        {
//            try
//            {
//                var students = manager.GetAllStudents();
//                return Ok(students);
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, ex.Message);
//            }
//        }

//        //  GET BY ID
//        [HttpGet("getById/{id}")]
//        public IActionResult GetById(int id)
//        {
//            try
//            {
//                var student = manager.GetStudentById(id);
//                return Ok(student);
//            }
//            catch (InvalidStudentDataException ex)
//            {
//                return BadRequest(ex.Message); // 400
//            }
//            catch (StudentNotFoundException ex)
//            {
//                return NotFound(ex.Message); // 404
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, ex.Message);
//            }
//        }

//        //  UPDATE
//        [HttpPut("update")]
//        public IActionResult Update(Student student)
//        {
//            try
//            {
//                var result = manager.UpdateStudent(student);

//                return result
//                    ? Ok("Student Updated Successfully")
//                    : BadRequest("Update failed");
//            }
//            catch (InvalidStudentDataException ex)
//            {
//                return BadRequest(ex.Message);
//            }
//            catch (StudentNotFoundException ex)
//            {
//                return NotFound(ex.Message);
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, ex.Message);
//            }
//        }

//        //  DELETE
//        [HttpDelete("delete/{id}")]
//        public IActionResult Delete(int id)
//        {
//            try
//            {
//                var result = manager.DeleteStudent(id);

//                return result
//                    ? Ok("Student Deleted Successfully")
//                    : BadRequest("Delete failed");
//            }
//            catch (InvalidStudentDataException ex)
//            {
//                return BadRequest(ex.Message);
//            }
//            catch (StudentNotFoundException ex)
//            {
//                return NotFound(ex.Message);
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, ex.Message);
//            }
//        }
//    }
//}
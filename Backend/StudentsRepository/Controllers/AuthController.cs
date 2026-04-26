using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using StudentsRepository.Models;
using StudentsRepository.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace StudentsRepository.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthManager _authManager;
        private readonly IConfiguration _config;

        public AuthController(IConfiguration config, AuthManager authManager)
        {
            _config = config;
            _authManager = authManager;
        }

        // LOGIN
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            if (login == null || string.IsNullOrEmpty(login.Username) || string.IsNullOrEmpty(login.Password))
                return BadRequest("Username and Password required");

            var user = await _authManager.ValidateUser(login.Username, login.Password);

            if (user == null)
                return Unauthorized("Invalid credentials");

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim("UserId", user.Id.ToString())
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"])
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(
                    Convert.ToDouble(_config["Jwt:ExpiryMinutes"])
                ),
                signingCredentials: creds
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new
            {
                token = tokenString,
                role = user.Role,
                userId = user.Id,
                message = "Login successful"
            });
        }

        // REGISTER WITH VALIDATION
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] LoginModel model)
        {
            if (string.IsNullOrEmpty(model.Username) || string.IsNullOrEmpty(model.Password))
                return BadRequest("Username and Password required");

            //  USERNAME VALIDATION
            if (!Regex.IsMatch(model.Username, @"^[a-zA-Z0-9]{4,20}$"))
            {
                return BadRequest("Username must be 4-20 characters and contain only letters and numbers");
            }

            //  PASSWORD VALIDATION
            if (!Regex.IsMatch(model.Password,
                @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"))
            {
                return BadRequest("Password must be at least 8 characters and include uppercase, lowercase, number, and special character");
            }

            //  CHECK EXISTING USER
            var existingUser = await _authManager.GetUserByUsername(model.Username);
            if (existingUser != null)
                return BadRequest("Username already exists");

            //  CREATE USER
            var newUser = new User
            {
                Username = model.Username,
                Password = model.Password, // ⚠️ (later you can hash)
                Role = "User"
            };

            await _authManager.CreateUser(newUser);

            return Ok("User registered successfully 🎉");
        }
    }
}


//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.IdentityModel.Tokens;
//using StudentsRepository.Models;
//using StudentsRepository.Services;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//namespace StudentsRepository.Controllers
//{
//    [ApiController]
//    [Route("auth")]
//    public class AuthController : ControllerBase
//    {
//        private readonly AuthManager _authManager;
//        private readonly IConfiguration _config;

//        public AuthController(IConfiguration config, AuthManager authManager)
//        {
//            _config = config;
//            _authManager = authManager;
//        }

//        // LOGIN API
//        [AllowAnonymous]
//        [HttpPost("login")]

//        public async Task<IActionResult> Login([FromBody] LoginModel login)
//        {
//            if (login == null || string.IsNullOrEmpty(login.Username) || string.IsNullOrEmpty(login.Password))
//                return BadRequest("Username and Password required");

//            var user = await _authManager.ValidateUser(login.Username, login.Password);

//            if (user == null)
//                return Unauthorized("Invalid credentials");

//            var claims = new[]
//            {
//        new Claim(ClaimTypes.Name, user.Username),
//        new Claim(ClaimTypes.Role, user.Role),
//        new Claim("UserId", user.Id.ToString()) // 🔥 ADD THIS
//    };

//            var key = new SymmetricSecurityKey(
//                Encoding.UTF8.GetBytes(_config["Jwt:Key"])
//            );

//            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

//            var token = new JwtSecurityToken(
//                issuer: _config["Jwt:Issuer"],
//                audience: _config["Jwt:Audience"],
//                claims: claims,
//                expires: DateTime.Now.AddMinutes(
//                    Convert.ToDouble(_config["Jwt:ExpiryMinutes"])
//                ),
//                signingCredentials: creds
//            );

//            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

//            return Ok(new
//            {
//                token = tokenString,
//                role = user.Role,
//                userId = user.Id, // 🔥 ALSO SEND TO FRONTEND
//                message = "Login successful"
//            });
//        }
//    }
//}










































































































































//using Microsoft.AspNetCore.Authorization; 
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.IdentityModel.Tokens;
//using StudentsRepository.Models;
//using StudentsRepository.Services;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//namespace StudentsRepository.Controllers
//{
//    [ApiController]
//    [Route("auth")]
//    public class AuthController : ControllerBase
//    {

//        private readonly AuthManager _authManager;
//        private readonly IConfiguration _config;

//        public AuthController(IConfiguration config, AuthManager authManager)
//        {
//            _config = config;
//            _authManager = authManager;
//        }

//        public AuthController(IConfiguration _config)
//        {
//            config = _config;
//        }

//        // VERY IMPORTANT → Allow login without token
//        [AllowAnonymous]
//        [HttpPost("login")]
//        public IActionResult Login([FromBody] LoginModel login)
//        {
//            // Null check (avoid crash)
//            if (login == null || string.IsNullOrEmpty(login.Username) || string.IsNullOrEmpty(login.Password))
//            {
//                return BadRequest("Username and Password required");
//            }

//            // Dummy validation (you can later connect DB)
//            if (login.Username != "Test" || login.Password != "Test123")
//            {
//                return Unauthorized("Invalid credentials");
//            }

//            // Claims (data inside token)
//            var claims = new[]
//            {
//                new Claim(ClaimTypes.Name, login.Username),
//                new Claim(ClaimTypes.Role, "Admin")
//            };

//            //  Read Key safely
//            var keyString = config["Jwt:Key"];
//            if (string.IsNullOrEmpty(keyString))
//            {
//                return StatusCode(500, "JWT Key not configured");
//            }

//            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyString));
//            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

//            // Create Token
//            var token = new JwtSecurityToken(
//                issuer: config["Jwt:Issuer"],
//                audience: config["Jwt:Audience"],
//                claims: claims,
//                expires: DateTime.Now.AddMinutes(
//                    Convert.ToDouble(config["Jwt:ExpiryMinutes"] ?? "60")
//                ),
//                signingCredentials: creds
//            );

//            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

//            //  Return token
//            return Ok(new
//            {
//                token = tokenString,
//                message = "Login successful"
//            });
//        }
//    }
//}
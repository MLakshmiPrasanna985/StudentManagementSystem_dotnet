using Microsoft.EntityFrameworkCore;
using StudentsRepository.Data;
using StudentsRepository.Models;

namespace StudentsRepository.Services
{
    public class AuthManager
    {
        private readonly StudentDbContext _context;

        public AuthManager(StudentDbContext context)
        {
            _context = context;
        }

        public async Task<User> ValidateUser(string username, string password)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Username == username && u.Password == password);
        }

        // 🔹 GET USER BY USERNAME
        public async Task<User> GetUserByUsername(string username)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Username == username);
        }

        // 🔹 CREATE USER
        public async Task CreateUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }
    }
}

//using Microsoft.EntityFrameworkCore;
//using StudentsRepository.Data;
//using StudentsRepository.Models;

//namespace StudentsRepository.Services
//{
//    public class AuthManager
//    {
//        private readonly StudentDbContext _context;

//        public AuthManager(StudentDbContext context)
//        {
//            _context = context;
//        }

//        public async Task<User> ValidateUser(string username, string password)
//        {
//            return await _context.Users
//                .FirstOrDefaultAsync(u => u.Username == username && u.Password == password);
//        }
//    }
//}
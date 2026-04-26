using Microsoft.EntityFrameworkCore;

namespace StudentsRepository.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StudentDbContext context)
        {
            context.Database.Migrate();

            var directory = new DirectoryInfo("Data/StoredProcedures");

            foreach (var file in directory.GetFiles("*.sql"))
            {
                var sql = File.ReadAllText(file.FullName);
                context.Database.ExecuteSqlRaw(sql);
            }
        }
    }
}
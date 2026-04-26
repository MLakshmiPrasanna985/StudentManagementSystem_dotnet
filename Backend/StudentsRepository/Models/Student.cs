namespace StudentsRepository.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string RollNumber { get; set; } 
        public string Course { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
    }
}
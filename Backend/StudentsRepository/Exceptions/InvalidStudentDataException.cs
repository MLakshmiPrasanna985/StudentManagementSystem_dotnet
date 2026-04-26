namespace StudentsRepository.Exceptions
{
    public class InvalidStudentDataException : Exception
    {
        public InvalidStudentDataException(string message) : base(message) { }
    }
}
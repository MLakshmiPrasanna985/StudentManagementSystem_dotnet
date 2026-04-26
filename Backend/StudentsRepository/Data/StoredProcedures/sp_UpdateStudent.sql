CREATE OR ALTER PROCEDURE sp_UpdateStudent
    @Id INT,
    @Name NVARCHAR(100),
    @RollNumber NVARCHAR(50),
    @Course NVARCHAR(100)
AS
BEGIN
    UPDATE Students
    SET Name = @Name,
        RollNumber = @RollNumber,
        Course = @Course,
        UpdatedOn = GETDATE()
    WHERE Id = @Id;
END
CREATE OR ALTER PROCEDURE sp_CreateStudent
    @Name NVARCHAR(100),
    @RollNumber NVARCHAR(50),
    @Course NVARCHAR(100)
AS
BEGIN
    INSERT INTO Students (Name, RollNumber, Course, CreatedOn)
    VALUES (@Name, @RollNumber, @Course, GETDATE());
END
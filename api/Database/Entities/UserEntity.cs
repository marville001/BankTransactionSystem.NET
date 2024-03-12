namespace api.Database.Entities;

public class UserEntity
{
    public long Id { get; set; }
    public Guid UserId { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string NationalId { get; set; }
    public required string PasswordHash { get; set; }
}
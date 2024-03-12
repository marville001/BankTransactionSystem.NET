namespace api.Dtos;

public class UserAccountDto
{
    public Guid AccountId { get; set; }
    public string Name { get; set; }
    public double Balance { get; set; }
    public Guid UserId { get; set; }
}
namespace api.Database.Entities;

public class AccountEntity
{
    public long Id { get; set; }
    public Guid AccountId { get; set; }
    public string Name { get; set; }
    public double Balance { get; set; }
    public long? UserId { get; set; }
    
    public UserEntity UserEntity { get; set; }
}
namespace api.Database.Entities;

public class AtmEntity
{
    public long Id { get; set; }
    public Guid AtmId { get; set; }
    public string Name { get; set; }
    public double Balance { get; set; }
}
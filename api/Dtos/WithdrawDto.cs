namespace api.Dtos;

public class WithdrawDto
{
    public Guid AtmId { get; set; }
    public Guid AccountId { get; set; }
    public double Amount { get; set; }
}
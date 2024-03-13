namespace api.Dtos;

public class TransferDto
{
    public Guid AccountId { get; set; }
    public Guid ReceiverAccountId { get; set; }
    public double Amount { get; set; }
}
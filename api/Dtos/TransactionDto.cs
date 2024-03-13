namespace api.Dtos;

public class TransactionDto
{
    public Guid TransactionId { get; set; }
    public string Status { get; set; }
    public double Amount { get; set; }
    public Guid AccountId { set; get; }
    public Guid? ReceiverAccountId { set; get; }
    public Guid? AtmId { get; set; }
    
    public UserAccountDto Account { get; set; }
    public UserAccountDto? ReceiverAccount { get; set; }
    public AtmDto? Atm { get; set; }
    public DateTime TransactionDate {get; set;}
    public string? TransactionType {get; set;}
    
    
}
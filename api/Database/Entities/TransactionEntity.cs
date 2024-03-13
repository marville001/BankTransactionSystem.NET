namespace api.Database.Entities;

public class TransactionEntity
{
    public long Id { get; set; }
    public Guid TransactionId { get; set; }
    public string Status { get; set; }
    public double Amount { get; set; }
    public long? AccountId { get; set; }
    public long? AtmId { get; set; }
    public long? ReceiverAccountId { get; set; }
    public DateTime TransactionDate { get; set; }
    public string TransactionType { get; set; }
    public AccountEntity AccountEntity { get; set; }
    public AccountEntity ReceiverAccountEntity { get; set; }
    public AtmEntity? AtmEntity { get; set; }
    
}
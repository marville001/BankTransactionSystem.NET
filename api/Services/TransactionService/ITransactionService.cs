using api.Dtos;

namespace api.Services.TransactionService;

public interface ITransactionService
{
    public Task<IEnumerable<TransactionDto>> GetUserTransactions();

}
using api.Dtos;

namespace api.Services.AccountService;

public interface IAccountService
{
    public Task<IEnumerable<UserAccountDto>> GetUserAccounts();

    public Task<TransactionDto> WithdrawMoney(WithdrawDto payload);
    public Task<TransactionDto> TransferMoney(TransferDto payload);
}
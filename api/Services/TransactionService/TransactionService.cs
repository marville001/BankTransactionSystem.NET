using System.Security.Claims;
using api.Database;
using api.Dtos;
using Microsoft.EntityFrameworkCore;

namespace api.Services.TransactionService;

public class TransactionService: ITransactionService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly DatabaseContext _dbContext;
    
    public TransactionService(
        DatabaseContext appDbContext, 
        IHttpContextAccessor httpContext
        )
    {
        _dbContext = appDbContext;
        _httpContextAccessor = httpContext;
    }
    
    public async Task<IEnumerable<TransactionDto>> GetUserTransactions()
    {
        var userContext = _httpContextAccessor?.HttpContext?.User;

        var userEmail = userContext.FindFirst(ClaimTypes.Email).Value;
        
        if (userEmail == null)
        {
            throw new InvalidDataException("Invalid Operation");
        }
        
        var loggedInUser = await _dbContext.UserEntities.FirstOrDefaultAsync(usr=>usr.Email == userEmail);
        if (loggedInUser == null)
        {
            throw new InvalidDataException("Invalid Operation");
        }

        return await _dbContext.TransactionEntities
            .Include(trn=>trn.AccountEntity)
            .Include(trn=>trn.ReceiverAccountEntity)
            .Include(trn=>trn.AtmEntity)
            .Where(acc => acc.AccountEntity.UserId == loggedInUser.Id)
            .Select(trn => new TransactionDto()
                {
                    TransactionId = trn.TransactionId,
                    Status = trn.Status,
                    Amount = trn.Amount,
                    AccountId = trn.AccountEntity.AccountId,
                    AtmId = trn.AtmId == null? null : trn.AtmEntity.AtmId,
                    ReceiverAccountId = trn.ReceiverAccountId == null? null :  trn.ReceiverAccountEntity.AccountId,
                    Account = new UserAccountDto()
                    {
                        AccountId = trn.AccountEntity.AccountId,
                        Name = trn.AccountEntity.Name,
                        Balance = trn.AccountEntity.Balance,
                    },
                    Atm = trn.AtmId == null? null : new AtmDto()
                    {
                        AtmId = trn.AtmEntity.AtmId,
                        Name = trn.AtmEntity.Name
                    },
                    ReceiverAccount = trn.ReceiverAccountId == null? null : new UserAccountDto()
                    {
                        AccountId = trn.ReceiverAccountEntity.AccountId,
                        Name = trn.ReceiverAccountEntity.Name,
                        Balance = trn.ReceiverAccountEntity.Balance,
                    },
                    TransactionDate = trn.TransactionDate,
                    TransactionType = trn.TransactionType
                }
            ).ToListAsync();

    }
}
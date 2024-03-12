using System.Security.Claims;
using api.Database;
using api.Database.Entities;
using api.Dtos;
using Microsoft.EntityFrameworkCore;

namespace api.Services.AccountService;

public class AccountService: IAccountService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly DatabaseContext _dbContext;
    
    public AccountService(
        DatabaseContext appDbContext, 
        IHttpContextAccessor httpContext
        )
    {
        _dbContext = appDbContext;
        _httpContextAccessor = httpContext;
    }
    
    public async Task<IEnumerable<UserAccountDto>> GetUserAccounts()
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

        var userAccounts = await _dbContext.AccountEntities
            .Where(acc => acc.UserId == loggedInUser.Id)
            .Select(acc => new UserAccountDto()
                {
                    AccountId = acc.AccountId,
                    Name = acc.Name,
                    Balance = acc.Balance,
                    UserId = loggedInUser.UserId
                }
            ).ToListAsync();

        return userAccounts;
    }

    public async Task<TransactionDto> WithdrawMoney(WithdrawDto payload)
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
        
        var atm = await _dbContext.AtmEntities
            .Where(atm => atm.AtmId == payload.AtmId)
            .FirstOrDefaultAsync();
        
        if (atm == null)
        {
            throw new InvalidOperationException("ATM not found");
        }

        var userAccount = await _dbContext.AccountEntities
            .Where(acc => acc.AccountId == payload.AccountId & acc.UserId == loggedInUser.Id)
            .FirstOrDefaultAsync();

        if (userAccount == null)
        {
            throw new InvalidOperationException("User account not found");
        }

        if (atm.Balance < payload.Amount)
            throw new InvalidOperationException("The selected ATM doesn't have enough funds for this transaction");
        

        if (userAccount.Balance < payload.Amount)
            throw new InvalidOperationException("Insufficient funds in your account");
        
        // SIMULATE WITHDRAWAL
        
        // Deduct Money From User
        userAccount.Balance -= payload.Amount;
        
        // DEDUCT Money From ATM
        atm.Balance -= payload.Amount;
        
        // Track transaction in DB
        TransactionEntity newTransaction = new TransactionEntity()
        {
            TransactionId = Guid.NewGuid(),
            Status = "Success",
            Amount = payload.Amount,
            AccountId = userAccount.Id,
            AtmId = atm.Id,
            TransactionDate = DateTime.Now,
            TransactionType = "Withdrawal"
        };
        
        await _dbContext.TransactionEntities.AddAsync(newTransaction);
        
        //SYNC DB With changes
        await _dbContext.SaveChangesAsync();

        return new TransactionDto()
        {
            TransactionId = newTransaction.TransactionId,
            Status = "Success",
            Amount = payload.Amount,
            AccountId = payload.AccountId,
            AtmId = payload.AtmId,
            Account = new UserAccountDto()
            {
                AccountId = userAccount.AccountId,
                Name = userAccount.Name,
                Balance = userAccount.Balance,
                UserId = loggedInUser.UserId
            },
            Atm = new AtmDto()
            {
                AtmId = atm.AtmId,
                Name = atm.Name,
            },
            TransactionDate = newTransaction.TransactionDate,
            TransactionType = newTransaction.TransactionType
        };
    }
}
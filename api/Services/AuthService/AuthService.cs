using System.Security.Authentication;
using System.Security.Claims;
using api.Database;
using api.Database.Entities;
using api.Dtos;
using api.Utils;
using Microsoft.EntityFrameworkCore;

namespace api.Services.AuthService;

public class AuthService: IAuthService
{
    private readonly DatabaseContext _dbContext;
    private IConfiguration _configuration;
    private TokenUtils _tokenUtils;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AuthService(
        DatabaseContext appDbContext, 
        IConfiguration configuration,
        IHttpContextAccessor httpContext
        )
    {
        _dbContext = appDbContext;
        _configuration = configuration;
        _tokenUtils = new TokenUtils(configuration);
        _httpContextAccessor = httpContext;
    }

    private async Task<UserEntity?> GetUserByNationalId(string nationalId)
    {
        return await _dbContext.UserEntities.FirstOrDefaultAsync(u => u.NationalId == nationalId);
    }
    
    public async Task<UserDto> RegisterUser(UserRegisterDto payload)
    {
        var existingUser = await GetUserByNationalId(payload.NationalId);
        if (existingUser != null)
        {
            throw new InvalidDataException("User with given National ID exists");
        }

        if (payload.Password.Length < 8)
        {
            throw new InvalidDataException("Password must be 8 or more characters");
        }

        UserEntity newUser = new UserEntity
        {
            UserId = Guid.NewGuid(),
            NationalId = payload.NationalId,
            FirstName = payload.FirstName,
            LastName = payload.LastName,
            Email = payload.Email,
            PasswordHash = PasswordUtils.HashPassword(payload.Password)
        };
        await _dbContext.UserEntities.AddAsync(newUser);
        await _dbContext.SaveChangesAsync();
        
        // Create User Default Account

        AccountEntity defaultUserAccount = new AccountEntity
        {
            AccountId = Guid.NewGuid(),
            Name = $"{newUser.FirstName} Default Account",
            Balance = 0.0,
            UserId = newUser.Id
        };
        await _dbContext.AccountEntities.AddAsync(defaultUserAccount);
        
        await _dbContext.SaveChangesAsync();

        string token = _tokenUtils.CreateToken(newUser!);
        return new UserDto()
        {
            NationalId = newUser.NationalId,
            FirstName = newUser.FirstName,
            LastName = newUser.LastName,
            Email = newUser.Email,
            UserId = newUser.UserId,
            Token = token
        };
    }

    public Task<VerificationDto> VerifyUserCreds(string password)
    {
        throw new NotImplementedException();
    }

    public async Task<UserDto> LoginUser(LoginDto payload)
    {
        var existingUser = await GetUserByNationalId(payload.NationalId);
        if (existingUser == null)
        {
            throw new InvalidCredentialException("Invalid Credentials Provided");
        }
        
        bool isValid = PasswordUtils.VerifyPassword(existingUser.PasswordHash, payload.Password);

        if (!isValid)
        {
            throw new InvalidCredentialException("Invalid Credentials Provided");
        }

        string token = _tokenUtils.CreateToken(existingUser);
        return new UserDto()
        {
            NationalId = existingUser.NationalId,
            FirstName = existingUser.FirstName,
            LastName = existingUser.LastName,
            Email = existingUser.Email,
            UserId = existingUser.UserId,
            Token = token
        };
    }

    public async Task<UserDto> GetLoggedInUser()
    {
        var userContext = _httpContextAccessor?.HttpContext?.User;

        var userEmail = userContext.FindFirst(ClaimTypes.Email).Value;
        
        if (userEmail == null)
        {
            throw new InvalidDataException("Invalid Operation");
        }
        
        var existingUser = await _dbContext.UserEntities.FirstOrDefaultAsync(usr=>usr.Email == userEmail);
        if (existingUser == null)
        {
            throw new InvalidDataException("Invalid Operation");
        }

        string token = _tokenUtils.CreateToken(existingUser);
        return new UserDto()
        {
            NationalId = existingUser.NationalId,
            FirstName = existingUser.FirstName,
            LastName = existingUser.LastName,
            Email = existingUser.Email,
            UserId = existingUser.UserId,
            Token = token
        };
    }
}
using api.Dtos;

namespace api.Services.AuthService;

public interface IAuthService
{
    public Task<UserDto> RegisterUser(UserRegisterDto payload);
    public Task<VerificationDto> VerifyUserCreds(string password);
    

    public Task<UserDto> LoginUser(LoginDto payload);
    public Task<UserDto> GetLoggedInUser();
}
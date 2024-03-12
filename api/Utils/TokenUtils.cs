using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using api.Database.Entities;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;

namespace api.Utils;

public class TokenUtils
{
    private readonly IConfiguration _configuration;

    public TokenUtils(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string CreateToken(UserEntity userEntity)
    {
        if (userEntity == null) throw new NullReferenceException();

        var claims = new List<Claim>()
        {
            new("firstName", userEntity.FirstName),
            new("lastName", userEntity.LastName),
            new("email", userEntity.Email),
            new("id", userEntity.Id.ToString()),
            new("UserId", userEntity.UserId.ToString()),
        };

        var secret = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("Jwt:Key").Get<string>()!));
        var credentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha512Signature);
        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public string DecodeTokenFromHeaders(HttpRequest request, string targetClaim)
    {
        var token = ParseBearerToken(request);
        var decodedClaim = ReadToken(token, targetClaim);

        return decodedClaim;
    }

    public string ParseBearerToken(HttpRequest httpRequest)
    {
        var bearerToken = httpRequest.Headers[HeaderNames.Authorization]
            .ToString().Replace("Bearer", "")
            .Trim();

        if (string.IsNullOrEmpty(bearerToken))
        {
            throw new InvalidOperationException("Failed to get  bearer token from request");
        }

        return bearerToken;
    }

    public string ReadToken(string token, string targetClaim)
    {
        if (string.IsNullOrEmpty(token) || string.IsNullOrEmpty(targetClaim))
            throw new InvalidOperationException("Token and Target Claim are required");
        
        var decodedClaim = (new JwtSecurityTokenHandler()
                .ReadToken(token) as JwtSecurityToken)!
            .Claims.AsEnumerable()
            .First(claim => claim.Type == targetClaim).Value;

        if (string.IsNullOrEmpty(decodedClaim))
            throw new InvalidOperationException($"Failed to decode {targetClaim} from token");
        return decodedClaim;
    }
}

using BC = BCrypt.Net.BCrypt;

namespace api.Utils;

public class PasswordUtils
{
    public static string HashPassword(string password){
        return BC.HashPassword(password);
    }

    public static bool VerifyPassword(string passwordHash, string password){
        return BC.Verify(password,passwordHash);
    }
}
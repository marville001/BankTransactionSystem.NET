using System.Security.Claims;
using api.Database;
using api.Dtos;
using Microsoft.EntityFrameworkCore;

namespace api.Services.AtmService;

public class AtmService: IAtmService
{
    private readonly DatabaseContext _dbContext;
    
    public AtmService(
        DatabaseContext appDbContext, 
        IHttpContextAccessor httpContext
        )
    {
        _dbContext = appDbContext;
    }
    
    public async Task<IEnumerable<AtmDto>> GetAvailableAtms()
    {
        return await _dbContext.AtmEntities
            .Select(atm => new AtmDto()
                {
                    AtmId = atm.AtmId,
                    Name = atm.Name,
                }
            ).ToListAsync();

    }
}
using api.Dtos;

namespace api.Services.AtmService;

public interface IAtmService
{
    public Task<IEnumerable<AtmDto>> GetAvailableAtms();

}
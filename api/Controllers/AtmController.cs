using api.Dtos;
using api.Services.AccountService;
using api.Services.AtmService;
using api.Services.AuthService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/atms")]
[ApiController]
[Produces("application/json")]
public class AtmController : Controller
{
    private readonly IAtmService _atmService;
    
    public AtmController(IAtmService atmService)
    {
        _atmService = atmService;
    }
    
    [HttpGet]
    [Route("")]
    [Authorize]
    public async Task<ActionResult> GetAvailableAtms()
    {
        try
        {
            var result = await _atmService.GetAvailableAtms();
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
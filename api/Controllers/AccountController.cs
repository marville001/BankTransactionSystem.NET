using api.Dtos;
using api.Services.AccountService;
using api.Services.AuthService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/accounts")]
[ApiController]
[Produces("application/json")]
public class AccountController : Controller
{
    private readonly IAccountService _accountService;
    
    public AccountController(IAccountService accountService)
    {
        _accountService = accountService;
    }
    
    [HttpGet]
    [Route("")]
    [Authorize]
    public async Task<ActionResult> GetUserAccounts()
    {
        try
        {
            var result = await _accountService.GetUserAccounts();
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
    
    [HttpPost]
    [Route("withdraw")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [Authorize]
    public async Task<ActionResult> WithdrawMoney(WithdrawDto payload)
    {
        try
        {
            var result = await _accountService.WithdrawMoney(payload);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }  
    
    [HttpPost]
    [Route("transfer")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [Authorize]
    public async Task<ActionResult> TransferMoney(TransferDto payload)
    {
        try
        {
            var result = await _accountService.TransferMoney(payload);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
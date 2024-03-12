using api.Dtos;
using api.Services.AccountService;
using api.Services.AtmService;
using api.Services.AuthService;
using api.Services.TransactionService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/transactions")]
[ApiController]
[Produces("application/json")]
public class TransactionsController : Controller
{
    private readonly ITransactionService _transactionService;
    
    public TransactionsController(ITransactionService transactionService)
    {
        _transactionService = transactionService;
    }
    
    [HttpGet]
    [Route("")]
    [Authorize]
    public async Task<ActionResult> GetUserTransactions()
    {
        try
        {
            var result = await _transactionService.GetUserTransactions();
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
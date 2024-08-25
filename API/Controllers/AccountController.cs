using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.UserName)) return BadRequest("UserName has been taken.");
        return Ok();
        // using var hmac = new HMACSHA512();
        // var user = new AppUser()
        // {
        //     UserName = registerDto.UserName.ToLower(),
        //     PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
        //     PasswordSalt = hmac.Key,
        // };
        //
        // context.Users.Add(user);
        // await context.SaveChangesAsync();
        // return new UserDto()
        // {
        //     UserName = registerDto.UserName, 
        //     Token = tokenService.CreateToken(user)
        // };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await context.Users.FirstOrDefaultAsync(user => user.UserName.ToLower() == loginDto.UserName.ToLower());
        if (user == null) return BadRequest("Could not authenticate");
        using var hmac = new HMACSHA512(user.PasswordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Could not authenticate");
        }
        
        return new UserDto()
        {
            UserName = user.UserName,
            Token = tokenService.CreateToken(user)
        };
    }
    
    private async Task<bool> UserExists(string username)
    {
        return await context.Users.AnyAsync(user => user.UserName.ToLower() == username.ToLower());
    }
    
    
    
}
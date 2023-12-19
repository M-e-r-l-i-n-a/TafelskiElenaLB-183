﻿using M183.Controllers.Dto;
using M183.Controllers.Helper;
using M183.Data;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace M183.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly NewsAppContext _context;

        public UserController(NewsAppContext context)
        {
            _context = context;
        }

        /// <summary>
        /// update password
        /// </summary>
        /// <response code="200">Password updated successfully</response>
        /// <response code="400">Bad request</response>
        /// <response code="404">User not found</response>
        [HttpPatch("password-update")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public ActionResult PasswordUpdate(PasswordUpdateDto request)
        {
            if (request == null)
            {
                return BadRequest("No request body");
            }

            var user = _context.Users.Find(request.UserId);
            if (user == null)
            {
                return NotFound(string.Format("User {0} not found", request.UserId));
            }

            if (user.Password != MD5Helper.ComputeMD5Hash(request.OldPassword))
            {
                return Unauthorized("Old password wrong");
            }

            string passwordValidation = validateNewPasswort(request.NewPassword);
            if (passwordValidation != "")
            {
                return BadRequest(passwordValidation);
            }

            user.IsAdmin = request.IsAdmin;
            user.Password = MD5Helper.ComputeMD5Hash(request.NewPassword);

            _context.Users.Update(user);
            _context.SaveChanges();

            return Ok("success");
        }

        private string validateNewPasswort(string newPassword)
        {
            // Check small letter.
            string patternSmall = "[a-zäöü]";
            Regex regexSmall = new Regex(patternSmall);
            bool hasSmallLetter = regexSmall.Match(newPassword).Success;

            string patternCapital = "[A-ZÄÖÜ]";
            Regex regexCapital = new Regex(patternCapital);
            bool hasCapitalLetter = regexCapital.Match(newPassword).Success;

            string patternNumber = "[0-9]";
            Regex regexNumber = new Regex(patternNumber);
            bool hasNumber = regexNumber.Match(newPassword).Success;

            List<string> result = new List<string>();
            if (!hasSmallLetter)
            {
                result.Add("keinen Kleinbuchstaben");
            }
            if (!hasCapitalLetter)
            {
                result.Add("keinen Grossbuchstaben");
            }
            if (!hasNumber)
            {
                result.Add("keine Zahl");
            }

            if (result.Count > 0)
            {
                return "Das Passwort beinhaltet " + string.Join(", ", result);
            }
            return "";
        }
    }
}

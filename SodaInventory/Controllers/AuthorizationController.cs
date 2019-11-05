using System;
using System.Net.Http;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace SodaInventory.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AuthorizationController : ControllerBase
	{
		private readonly ILogger<AuthorizationController> _logger;

		public AuthorizationController(ILogger<AuthorizationController> logger)
		{
			_logger = logger;
		}

		[HttpGet]
		public HttpResponseMessage Get(string userName, bool isAuthorized = true)
		{
			HttpResponseMessage response = new HttpResponseMessage();
			string userLevel = "Admin";
			//bool isAuthorized = true;
			if(isAuthorized)
			{
				_logger.LogInformation(userName + " is now logged in");
				response.StatusCode = System.Net.HttpStatusCode.OK;
				response.Content = new StringContent("UserLevel: " + userLevel);
				return response;
			}
			else
			{
				_logger.LogWarning(userName + " is an unauthorized user that tried to log in.");
				response.StatusCode = System.Net.HttpStatusCode.Unauthorized;
				return response;
			}
		}
	}
}
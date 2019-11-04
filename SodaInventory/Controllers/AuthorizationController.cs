using System;
using System.Net.Http;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace SodaInventory.Controllers
{
	[ApiController]
	[Route("[api]")]
	public class AuthorizationController : ControllerBase
	{
		private readonly ILogger<AuthorizationController> _logger;

		public AuthorizationController(ILogger<AuthorizationController> logger)
		{
			_logger = logger;
		}

		[HttpGet]
		public HttpResponseMessage GetAuthorization(string userName)
		{
			bool isAuthorized = true;
			if(isAuthorized)
			{
				_logger.LogInformation(userName + " is now logged in");
				return new HttpResponseMessage(System.Net.HttpStatusCode.OK);
			}
			else
			{
				_logger.LogInformation(userName + " is an unauthorized user that tried to log in.");
				return new HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized);
			}
		}
	}
}

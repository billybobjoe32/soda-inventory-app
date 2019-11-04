using System;

namespace DatabaseDAL
{
	public class AuthorizationDAL : DBDAL
	{
		public static bool IsAuthorized(string user)
		{
			return true;
		}
	}
}
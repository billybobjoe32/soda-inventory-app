using Microsoft.Extensions.Configuration;

namespace DatabaseDAL
{
	public class DBDAL
	{
		private static string _masterDBConnectionString;
		public static string MasterDBConnectionString
		{
			get
			{
				if (string.IsNullOrEmpty(_masterDBConnectionString))
				{
					_masterDBConnectionString = ConfigurationManager.ConnectionStrings["MasterDBConnectionString"].ConnectionString;
				}
				return _masterDBConnectionString;
			}

			set
			{
				_masterDBConnectionString = value;
			}
		}
	}
}

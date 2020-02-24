using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace SodaInventory.Model
{
    public class Emailer
    {
        private const string SMTP_USER = "sodarushdev@gmail.com";
        private const string SMTP_PASS = "sodarushdevmail";

        public Emailer()
        {
        }

        public void sendEmail(Registration registration)
        {
            using var message = new MailMessage();
            message.To.Add(new MailAddress(registration.Email, "To-Test"));
            message.From = (new MailAddress("sodarushdev@gmail.com", "Soda Rush Development"));
            message.Subject = "Subject";
            
            var builder = new StringBuilder();
            using (var reader = File.OpenText("./HTMLTemplates/RegistrationEmail.html"))
            {
                builder.Append(reader.ReadToEnd());
            }

            builder.Replace("{{company}}", registration.CompanyName);
            if (Util.IS_DEV)
            {
                builder.Replace("{{domain}}", Util.DEVELOPMENT_URL);
            }
            else
            {
                builder.Replace("{{domain}}", Util.PRODUCTION_URL);
            }

            builder.Replace("{{registrationCode}}", registration.RegistrationCode);
            
            message.Body = builder.ToString();
            message.IsBodyHtml = true;

            using var client = new SmtpClient("smtp.gmail.com");
            client.Port = 587;
            client.Credentials = new NetworkCredential(SMTP_USER, SMTP_PASS);
            client.EnableSsl = true;
            client.Send(message);
        }
    }
}

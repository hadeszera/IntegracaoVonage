using Microsoft.Extensions.Configuration;
using OpenTokSDK;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class OpenTokService
    {


        private readonly IConfiguration _configuration;

        public OpenTokService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Session Session { get; protected set; }
        public OpenTok OpenTok { get; protected set; }

        

        public void InitSessionOpenTok()
        {
            int apiKey = 0;
            string apiSecret = null;
            try
            {
                string apiKeyString = _configuration.GetSection("OpenTok")["API_KEY"];
                apiSecret = _configuration.GetSection("OpenTok")["API_SECRET"];
                apiKey = Convert.ToInt32(apiKeyString);
            }

            catch (Exception ex)
            {
                if (!(ex is ConfigurationErrorsException || ex is FormatException || ex is OverflowException || ex is NullReferenceException))
                {
                    throw ex;
                }
            }

            finally
            {
                if (apiKey == 0 || apiSecret == null)
                {
                    Console.WriteLine(
                        "The OpenTok API Key and API Secret were not set in the application configuration. " +
                        "Set the values in App.config and try again. (apiKey = {0}, apiSecret = {1})", apiKey, apiSecret);
                    Console.ReadLine();
                    Environment.Exit(-1);
                }
            }

            this.OpenTok = new OpenTok(apiKey, apiSecret);

            this.Session = this.OpenTok.CreateSession();
        }
    }
}

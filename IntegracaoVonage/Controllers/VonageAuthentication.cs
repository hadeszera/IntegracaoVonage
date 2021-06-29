using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OpenTokSDK;
using Service;
using System.Dynamic;

namespace IntegracaoVonage.Controllers
{
    [Route("v1/Vonage")]
    [ApiController]
    public class VonageAuthentication : ControllerBase
    {
        private readonly OpenTokService openTokService;

        public VonageAuthentication(OpenTokService openTokService)
        {
            this.openTokService = openTokService;
        }

        [HttpGet]
        public async Task<ActionResult> InitSession()
        {
            dynamic locals = new ExpandoObject();
            locals.ApiKey = openTokService.OpenTok.ApiKey.ToString();
            locals.SessionId = openTokService.Session.Id;
            locals.Token = openTokService.Session.GenerateToken();
            return Ok(locals);
        }








      
    }
}

using Microsoft.AspNetCore.Mvc;
using Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        [HttpPost]
        public IActionResult Result([FromServices] OpenTokService openTokService) 
        {
            return Ok(new
            {
                apiKey =  openTokService.OpenTok.ApiKey.ToString(),
                sessionId = openTokService.Session.Id,
                token = openTokService.Session.GenerateToken()
            });        
        }

        [HttpPost("listAllActiveRooms")]
        public IActionResult ResultListActiveRooms()
        {
            List<object> list = new List<object>();
            list.Add(new { RoomName = "Sala  1" });
            list.Add(new { RoomName = "Sala  2" });
            list.Add(new { RoomName = "Sala  3" });
            list.Add(new { RoomName = "Sala  4" });
            list.Add(new { RoomName = "Sala  5" });

            return Ok(list);
        }



    }
}

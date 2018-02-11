using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace AzureToolkit.Controllers
{    
    
    [Route("api/[controller]")]
    public class ConfigController : Controller
    {
        private IConfiguration _config;

        public ConfigController(IConfiguration configuration) {
            _config = configuration;
        }

        [HttpGet("bingSearchAPIKey")]
        public string getBingSearchAPIKey()
        {
            return _config["bingSearchAPIKey"];
        }

        [HttpGet("computerVisionAPIKey")]
        public string getComputerVisionAPIKey()
        {
            return _config["computerVisionAPIKey"];
        }

    }
}
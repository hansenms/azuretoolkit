using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System.Net;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using WebApplicationBasic.Models;
using System.Collections.Generic;
using System.Linq;

namespace WebApplicationBasic.Controllers
{
    [Route("api/[controller]")]
    public class ImagesController : Controller
    {
        private CloudBlobContainer _container;
        private ILogger<ImagesController> _logger;

        private AzureToolkitContext _context;

        private IConfiguration _configuration;

        public ImagesController(IConfiguration configuration,
                                ILogger<ImagesController> logger,
                                AzureToolkitContext context)
        {
            _logger = logger;
            _context = context;
            _configuration = configuration;

            _logger.LogInformation("storage account: " + configuration["storageaccount"]);
            _logger.LogInformation("storage key: " + configuration["storagekey"]);

            CloudStorageAccount storageAccount = new CloudStorageAccount(
                new Microsoft.WindowsAzure.Storage.Auth.StorageCredentials(
                        configuration["storageaccount"],
                        configuration["storagekey"]), true);
            // Create a blob client.
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            _container = blobClient.GetContainerReference("savedimages");
        }

        [HttpPost]
        public async Task<IActionResult> PostImage([FromBody]ImagePostRequest request)
        {
             _logger.LogInformation("Trying to save image " + request.Id);

            CloudBlockBlob blockBlob = _container.GetBlockBlobReference($"{request.Id}.{request.EncodingFormat}");
            HttpWebRequest aRequest = (HttpWebRequest)WebRequest.Create(request.URL);
            HttpWebResponse aResponse = (await aRequest.GetResponseAsync()) as HttpWebResponse;
            var stream = aResponse.GetResponseStream();
            await blockBlob.UploadFromStreamAsync(stream);
            stream.Dispose();

            //Save metadata
            var savedImage = new SavedImage();
            savedImage.UserId = request.UserId;
            savedImage.Description = request.Description;
            savedImage.StorageUrl = blockBlob.Uri.ToString();
            savedImage.Tags = new List<SavedImageTag>();

            foreach(var tag in request.Tags)
            {
                savedImage.Tags.Add(new SavedImageTag() {Tag = tag});
            }

            _context.Add(savedImage);
            _context.SaveChanges();

            return Ok();
        }

        [HttpGet]
        public async Task<string> GetImage()
        {
            return _configuration.GetConnectionString("defaultConnection");
        }

    }
    public class ImagePostRequest
     {
         public string UserId { get; set; }
         public string Description { get; set; }
         public string[] Tags { get; set; }
         public string URL { get; set; }
         public string Id { get; set; }
         public string EncodingFormat { get; set; }
     }
}
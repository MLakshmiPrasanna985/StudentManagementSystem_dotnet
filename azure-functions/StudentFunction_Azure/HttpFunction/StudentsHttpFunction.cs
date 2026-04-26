using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace StudentFunction_Azure.HttpFunction
{
    public class StudentsHttpFunction
    {
        private readonly ILogger<StudentsHttpFunction> _logger;
        private readonly HttpClient _httpClient;

        public StudentsHttpFunction(ILogger<StudentsHttpFunction> logger)
        {
            _logger = logger;
            _httpClient = new HttpClient();
        }

        [Function("StudentsHttpFunction")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "student/{id}")] HttpRequest req,
            string id)
        {
            _logger.LogInformation($"HTTP Trigger called with ID: {id}");

            try
            {
                // Call backend API
                string apiUrl = $"http://localhost:5002/student/getById/{id}";

                var response = await _httpClient.GetAsync(apiUrl);

                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();

                    _logger.LogInformation("✅ Student Data:");
                    _logger.LogInformation(data);

                    return new OkObjectResult(data);
                }
                else
                {
                    return new BadRequestObjectResult($"❌ API failed: {response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"❌ Exception: {ex.Message}");
                return new StatusCodeResult(500);
            }
        }
    }
}















//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Azure.Functions.Worker;
//using Microsoft.Extensions.Logging;

//namespace StudentFunction_Azure.HttpFunction;

//public class StudentsHttpFunction
//{
//    private readonly ILogger<StudentsHttpFunction> _logger;

//    public StudentsHttpFunction(ILogger<StudentsHttpFunction> logger)
//    {
//        _logger = logger;
//    }

//    [Function("StudentsHttpFunction")]
//    public IActionResult Run([HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequest req)
//    {
//        _logger.LogInformation("C# HTTP trigger function processed a request.");
//        return new OkObjectResult("Welcome to Azure Functions!");
//    }
//}
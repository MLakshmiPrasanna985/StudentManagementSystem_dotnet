using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace StudentFunction_Azure.TimerTriggerFunction
{
    public class StudentTimerFunction
    {
        private readonly ILogger _logger;
        private readonly HttpClient _httpClient;

        public StudentTimerFunction(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<StudentTimerFunction>();
            _httpClient = new HttpClient();
        }

        [Function("StudentTimerTrigger")]
        public async Task Run([TimerTrigger("0 */1 * * * *")] TimerInfo myTimer)
        {
            _logger.LogInformation($"⏰ Timer triggered at: {DateTime.Now}");

            try
            {
                
                var response = await _httpClient.GetAsync("http://localhost:5002/student/getAll");

                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();

                    _logger.LogInformation("✅ Students Data Received:");
                    _logger.LogInformation(data);
                }
                else
                {
                    _logger.LogError($"❌ API Failed with status: {response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"❌ Exception: {ex.Message}");
            }

            if (myTimer.ScheduleStatus != null)
            {
                _logger.LogInformation($"⏭ Next Run: {myTimer.ScheduleStatus.Next}");
            }
        }
    }
}
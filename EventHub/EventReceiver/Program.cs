using Microsoft.Azure.EventHubs;
using Microsoft.Azure.EventHubs.Processor;
using System;
using System.Threading.Tasks;

namespace EventReceiver
{
    class Program
    {
        private const string EventHubConnectionString = "Endpoint=sb://<namespace>.servicebus.windows.net/;SharedAccessKeyName=<policyname>;SharedAccessKey=<key>";
        private const string EventHubName = "<event-hub-name>";
        private const string StorageContainerName = "<storage-container-name-for-checkpoint>";
        private const string StorageConnectionString = "<storage-connectionstring-for-checkpoint";

        static async Task Main(string[] args)
        {
            Console.WriteLine("Registering EventProcessor...");

            var eventProcessorHost = new EventProcessorHost(
                EventHubName,
                PartitionReceiver.DefaultConsumerGroupName,
                EventHubConnectionString,
                StorageConnectionString,
                StorageContainerName);

            // Registers the Event Processor Host and starts receiving messages
            await eventProcessorHost.RegisterEventProcessorAsync<SimpleEventProcessor>();

            Console.WriteLine("Receiving. Press enter key to stop worker.");
            Console.ReadLine();
            Console.WriteLine("Shutting down... Please wait.");

            // Disposes of the Event Processor Host
            await eventProcessorHost.UnregisterEventProcessorAsync();
        }
    }
}

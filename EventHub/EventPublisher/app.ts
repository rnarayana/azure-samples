import { EventHubClient } from "@azure/event-hubs";

export class App {
    private connectionString: string;
    private eventHubName: string;
    private clients: EventHubClient[] = [];

    constructor(connectionString:string, eventHubName: string) {
        this.connectionString = connectionString;
        this.eventHubName = eventHubName
    }
    async run(){
        for (let i = 0; i < 100; i++) {
            let publisherId = i % 5;            
            if(this.clients[publisherId] === undefined) {
                this.clients[publisherId] = EventHubClient.createFromConnectionString(this.connectionString, `${this.eventHubName}/publishers/publisher${publisherId}`);
            }

            const eventData = {body: `Event ${i}`};
            console.log(`Sending message: ${eventData.body}`);
            await this.clients[publisherId].send(eventData);
        }

        this.clients.forEach(async client => {         
            await client.close();
        });
    }
};
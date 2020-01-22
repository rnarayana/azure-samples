import { EventHubClient } from "@azure/event-hubs";
import { Guid } from "guid-typescript";

export class App {
    private locationClients: EventHubClient[] = [];
    private driverClients: EventHubClient[] = [];

    constructor(public connectionString:string, public locationEventHubName: string, public driverEventHubName: string) {
    }

    async run(){
        for (let i = 0; i < 100; i++) {
            let publisherId = i % 5;
            if(i%9 == 0) {
                if(this.driverClients[publisherId] === undefined) {
                    this.driverClients[publisherId] = EventHubClient.createFromConnectionString(this.connectionString, `${this.driverEventHubName}/publishers/publisher${publisherId}`);
                }
                
                let driverData = {
                    terminalCode: "TPA",
                    planDate: "2020-01-05",
                    eventId: Guid.create().toString(),
                    eventType: "ShipmentPickedUp",
                    eventOccurredTS: new Date().toISOString(), // FIX TIMEZONE
                    eventData: {
                        DriverId: i,
                        StopId: "yyy",
                        z: "zzz",
                        lat: 123.456,
                        long: 88.66
                    }
                };
                const eventData = {body: driverData};
                console.log(`Sending message:`, eventData.body);
            await this.driverClients[publisherId].send(eventData);
            }
            else{
                if(this.locationClients[publisherId] === undefined) {
                    this.locationClients[publisherId] = EventHubClient.createFromConnectionString(this.connectionString, `${this.locationEventHubName}/publishers/publisher${publisherId}`);
                }
                
                let locationData = {
                    driverID: "D1",
                    lat: 12.3456,
                    long: 34.567891,
                    eventTime: new Date().toISOString() // FIX TIMEZONE
                }
                const eventData = {body: locationData};
                console.log(`Sending message:`, eventData.body);
                await this.locationClients[publisherId].send(eventData);
            }
        }

        this.driverClients.forEach(async client => {         
            await client.close();
        });

        this.locationClients.forEach(async client => {         
            await client.close();
        });
    }
};
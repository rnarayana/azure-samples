import { App } from "./app";

async function main() {
    const app = new App(
        "Endpoint=sb://<namespace>.servicebus.windows.net/;SharedAccessKeyName=<policyname>;SharedAccessKey=<key>",
        "<location-event-hub-name>",
        "<driver-event-hub-name>");
    await app.run();
}

main().catch(err => {
    console.error(err);
})
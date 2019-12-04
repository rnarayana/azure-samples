import { App } from "./app";

async function main() {
    const app = new App(
        "Endpoint=sb://<namespace>.servicebus.windows.net/;SharedAccessKeyName=<policyname>;SharedAccessKey=<key>",
        "<event-hub-name>");
    await app.run();
}

main().catch(err => {
    console.error(err);
})
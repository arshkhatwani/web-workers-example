import heavyFunc from "./heavyFunc";
const self = globalThis as unknown as DedicatedWorkerGlobalScope;

self.onmessage = function (event: MessageEvent<string>) {
    console.log("Received message from the main thread:", event.data);

    heavyFunc();

    postMessage("Done");
};

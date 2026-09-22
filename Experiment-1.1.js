const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("greet", (name) => {
    console.log(`Hello, ${name}! Welcome to FSD Lab.`);
});

emitter.on("exit", () => {
    console.log("Exit event triggered cleanly.");
});

emitter.emit("greet", "Aniket Kumar");
emitter.emit("exit");

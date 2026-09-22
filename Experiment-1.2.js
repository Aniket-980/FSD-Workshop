const EventEmitter = require("events");
const button = new EventEmitter();

button.on("click", (user) => {
    console.log(`${user} clicked the submit button.`);
});

button.on("hover", () => {
    console.log("Cursor hovered over element.");
});

button.emit("hover");
button.emit("click", "Aniket Kumar");

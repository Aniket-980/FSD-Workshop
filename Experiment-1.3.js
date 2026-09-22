console.log("1. Execution Start");

setTimeout(() => {
    console.log("4. Timer Callback (setTimeout)");
}, 0);

setImmediate(() => {
    console.log("5. Check Callback (setImmediate)");
});

process.nextTick(() => {
    console.log("3. Microtask Callback (nextTick)");
});

console.log("2. Execution End");

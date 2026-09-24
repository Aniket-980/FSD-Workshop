const EventEmitter = require('events');

class Element extends EventEmitter {

    constructor(name, parent = null) {
        super();
        this.name = name;
        this.parent = parent;
    }

    addEventListener(type, handler) {
        this.on(type, handler);
    }

    removeEventListener(type, handler) {
        this.off(type, handler);
    }

    dispatchEvent(type, data = {}) {

        const event = {
            type: type,
            target: this,
            currentTarget: this,
            data: data,
            stopped: false,

            stopPropagation() {
                this.stopped = true;
            }
        };

        let current = this;

        while (current) {

            event.currentTarget = current;

            current.emit(type, event);

            if (event.stopped) {
                break;
            }

            current = current.parent;
        }
    }
}
const documentElement = new Element('document');
const form = new Element('form', documentElement);
const button = new Element('button', form);
function clickHandler(event) {
    console.log(
        `Element: ${this.name}, Target: ${event.target.name}, CurrentTarget: ${event.currentTarget.name}`
    );
}
documentElement.addEventListener('click', clickHandler);
form.addEventListener('click', clickHandler);
button.addEventListener('click', clickHandler);
console.log('\n--- Scenario A ---');

button.dispatchEvent('click');
console.log('\n--- Scenario B ---');

function formStopHandler(event) {
    console.log('Form: stopping propagation');
    event.stopPropagation();
}

form.removeEventListener('click', clickHandler);
form.addEventListener('click', formStopHandler);

button.dispatchEvent('click');
console.log('\n--- Scenario C ---');

button.removeEventListener('click', clickHandler);

button.dispatchEvent('click');

console.log('\n--- Keypress Event ---');

form.addEventListener('keypress', (event) => {
    console.log(
        `Keypress handled by ${event.currentTarget.name}`
    );
});

form.dispatchEvent('keypress', {
    key: 'Enter'
});
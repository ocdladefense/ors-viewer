/**
 * @fileoverview This file contains the Greeter class.
 * @author Your Name <your.email@example.com>
 */

/**
 * A class that represents a Greeter.
 */
class Greeter {
    /**
     * Creates an instance of Greeter.
     * @param {string} greeting - The default greeting message.
     */
    constructor(greeting) {
        /**
         * The default greeting message.
         * @type {string}
         */
        this.greeting = greeting;
    }

    /**
     * Sets a new greeting message.
     * @param {string} newGreeting - The new greeting message.
     */
    setGreeting(newGreeting) {
        this.greeting = newGreeting;
    }

    /**
     * Greets a user with the current greeting message.
     * @param {string} name - The name of the user to greet.
     * @returns {string} The greeting message.
     */
    greet(name) {
        return `${this.greeting}, ${name}!`;
    }
}

// Example usage:
const greeter = new Greeter('Hello');
console.log(greeter.greet('World')); // Outputs: Hello, World!
greeter.setGreeting('Hi');
console.log(greeter.greet('World')); // Outputs: Hi, World!

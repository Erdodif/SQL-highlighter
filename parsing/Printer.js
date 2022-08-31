export default class Printer {
    logColour(colour, string) {
        console.log(`${colour}${string}${colours.reset}`);
    }
}
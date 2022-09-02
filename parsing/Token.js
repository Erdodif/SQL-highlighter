export default class Token {
    #name;
    #main;
    #side;
    #description;
    #alternative;
    #argument;

    constructor(name, main, side, description = null, alternative = null, argument = null) {
        this.#name = name;
        this.#main = main;
        this.#side = side;
        this.#description = description;
        this.#alternative = alternative;
        this.#argument = argument;
    }
    
    getName() {
        return this.#name;
    }
    getMain() {
        return this.#main;
    }
    getSide() {
        return this.#side;
    }
    getDescription() {
        return this.#description;
    }
    getAlternative() {
        return this.#alternative;
    }
    getArgument() {
        return this.#argument;
    }

}
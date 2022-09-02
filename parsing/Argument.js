export default class Argument {
    #name;
    #type;
    #description;
    #optional;
    #defaultValue;
    #enumerator;
    #infinite

    constructor(name, type, description = null, optional = false, defaultValue = null, enumerator = null, infinite = false) {
        this.#name = name;
        this.#type = type;
        this.#description = description;
        this.#optional = optional;
        this.#defaultValue = defaultValue;
        this.#enumerator = enumerator;
        this.#infinite = infinite;
    }

    getName(){
        return this.#name;
    }
    getType(){
        return this.#type;
    }
    getDescription(){
        return this.#description;
    }
    isOptional(){
        return this.#optional;
    }
    getDefaultValue(){
        return this.#defaultValue;
    }
    getEnumerator(){
        return this.#enumerator;
    }
    isInfinite(){
        return this.#infinite;
    }
}
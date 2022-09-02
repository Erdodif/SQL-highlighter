export default class Enum {
    #name;
    #form;
    #alternatives;

    constructor(name,form,alternatives = null){
        this.#name = name;
        this.#form = form;
        this.#alternatives = alternatives;
    }
}
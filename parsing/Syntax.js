import Token from "./Token.js";
import Argument from "./Argument.js";
import fs from "fs";

export default class Syntax {
    dictionary;

    constructor(dictionaryFilePath) {
        this.dictionary = JSON.parse(fs.readFileSync(dictionaryFilePath, { encoding: 'utf8' }));
    }

    #tokenMatchesKey(index, key) {
        if (this.dictionary[index].name != key && this.dictionary[index].alternative !== undefined && this.dictionary[index].alternative !== null) {
            for (const alternative of this.dictionary[index].alternative) {
                if (alternative == key) {
                    return true;
                }
            }
        }
        return this.dictionary[index].name == key;
    }

    getTokenByKey(key) {
        key = key.toString().toLowerCase();
        let i = 0;
        while (i < this.dictionary.length && !this.#tokenMatchesKey(i,key)){
            i++;
        }
        if (i < this.dictionary.length){
            return this.getToken(i);
        }
        return null;
    }

    getToken(i) {
        let raw = this.dictionary[i];
        if (raw === undefined) {
            return null;
        }
        let args = [];
        if (raw.args !== undefined) {
            for (const argument of raw.args) {
                args.push(
                    new Argument(
                        argument.name,
                        argument.type,
                        argument.description === undefined ? null : argument.description,
                        Boolean(argument.optional),
                        argument.default,
                        argument.enum === undefined ? null : argument.enum,
                        Boolean(argument.infinite)
                    ));
            }
        }
        let token = new Token(
            raw.name,
            raw.main,
            raw.side,
            raw.description === undefined ? null : raw.description,
            raw.alternative === undefined ? null : raw.alternative,
            args.length > 0 ? args : null
        );
        return token;
    }
}
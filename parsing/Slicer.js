export default class Slicer {
    #EscapeDelimiters = ["\"", "\'"]
    #StaticDelimiters = ["\`"]
    //Default regex:  /("([\\].[^"]*)")|("[^\\"]*")|('([\\].[^']*)')|('[^']*')|(`[^`]*`)/gus);

    setDefaultDelimiters(escapeDelimiters, staticDelimiters) {
        this.#EscapeDelimiters = escapeDelimiters;
        this.#StaticDelimiters = staticDelimiters;
    }

    getDefaultEscapeDelimiters(delimiters) {
        return this.#EscapeDelimiters;
    }

    getDefaultStaticDelimiters(delimiters) {
        return this.#StaticDelimiters;
    }

    #createEscapeRexexPart(charFor) {
        return `(?:${charFor}(?:[\\\\].[^${charFor}]*)${charFor})|(?:${charFor}[^${charFor}]*${charFor})`;
    }
    #createStaticRexexPart(charFor) {
        return `(?:${charFor}[^${charFor}]*${charFor})`;
    }

    #getFullRegex() {
        let regex = "/";
        if (this.#EscapeDelimiters !== null && this.#EscapeDelimiters.length > 0) {
            for (const character of this.#EscapeDelimiters) {
                regex += this.#createEscapeRexexPart(character) + "|";
            }
        }
        if (this.#StaticDelimiters !== null && this.#StaticDelimiters.length > 0) {
            for (const character of this.#StaticDelimiters) {
                regex += this.#createStaticRexexPart(character) + "|";
            }
        }
        return regex.slice(0, regex.length - 1) + "/gus";
    }

    splitString(text) {
        return this.#getFullRegex()+"\n"+
        text.split(this.#getFullRegex())+"\n"+
        this.#createEscapeRexexPart("\'")+"\n"+
        this.#createEscapeRexexPart("\"")+"\n"+
        this.#createStaticRexexPart("\`")+"\n"+
        text.split( /(?:"(?:[\\].[^"]*)")|(?:"[^"]*")|(?:'(?:[\\].[^']*)')|(?:'[^']*')|(?:`[^`]*`)/gus)
        //regex works statically
        ;
    }
}
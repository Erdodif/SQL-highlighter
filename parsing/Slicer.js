export default class Slicer {
    #LineSeparator;
    #SingleLineComment;
    #MultiLineComment;
    #EscapeDelimiters;
    #StaticDelimiters;

    constructor(lineSeparator = null, singleLineComment = null, multiLineCommentStart = null,multiLineCommentEnd = null, escapeDelimiters = null, staticDelimiters = null) {
        this.#LineSeparator = lineSeparator ?? ";";
        this.#SingleLineComment = singleLineComment ?? "--";
        this.#MultiLineComment = { start: "/*", end: "*/" };
        if(multiLineCommentStart === null || multiLineCommentEnd === null ){
            this.#MultiLineComment = { start: multiLineCommentStart, end: multiLineCommentEnd };
        }
        this.#EscapeDelimiters = escapeDelimiters ?? ["\"", "\'"];
        this.#StaticDelimiters = staticDelimiters ?? ["\`"];
    }

    //Default regex:  /("([\\].[^"]*)")|("[^\\"]*")|('([\\].[^']*)')|('[^']*')|(`[^`]*`)/gus);

    #setMultiLineComment(start, end) {
        this.#MultiLineComment = { start: start, end: end };
    }
    #setDefaultDelimiters(escapeDelimiters, staticDelimiters) {
        this.#EscapeDelimiters = escapeDelimiters;
        this.#StaticDelimiters = staticDelimiters;
    }

    getEscapeDelimiters() {
        return this.#EscapeDelimiters;
    }
    getStaticDelimiters() {
        return this.#StaticDelimiters;
    }
    getLineSeparator(){
        return this.#LineSeparator;
    }
    getSingleLineComment(){
        return this.#SingleLineComment;
    }
    getMultiLineComment(){
        return this.#MultiLineComment;
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
        return this.#getFullRegex() + "\n" +
            text.split(this.#getFullRegex()) + "\n" +
            this.#createEscapeRexexPart("\'") + "\n" +
            this.#createEscapeRexexPart("\"") + "\n" +
            this.#createStaticRexexPart("\`") + "\n" +
            text.split(/(?:"(?:[\\].[^"]*)")|(?:"[^"]*")|(?:'(?:[\\].[^']*)')|(?:'[^']*')|(?:`[^`]*`)/gus)
            //regex works statically
            ;
    }
}
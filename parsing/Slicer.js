import { group } from "console";

export default class Slicer {

    // Default regex:  /(?<string>(?:"(?:(?:[\\].|[^"])*)")|(?:'(?:(?:[\\].|[^'])*)'))|(?<column_string>`[^`]*`)|(?<sl_comment>--([^\n])*\n)|(?<ml_comment>\/\*(?:\*\/){0}.*?\*\/)|(?<line_break>;)|(?<delimiter> |\n|\t)|(?<token>(?:(?!\/\*)(?:[^" ]))*)/gusi
    // Those characters that might be ambigious for regex should be stored in the escaped way (example in the default values)

    #singleLineComment = "--";
    #multiLineComment = { start: "\\/\\*", end: "\\*\\/" } // escaped for regex, "\\/\\*" => "\/\*"
    #stringChars = ["\"", "\'"];
    #columnStringCharPair = { start: "\`", end: null };
    #lineBreak = ";";
    #regex = this.getFullRegex();

    getSingleLineComment() {
        return this.#singleLineComment;
    }

    setSingleLineComment(identifier) {
        if (identifier !== this.#singleLineComment) {
            this.#singleLineComment = identifier;
            this.refreshSelfRegex();
        }
    }

    getMultiLineCommentStart() {
        return this.#multiLineComment.start;
    }

    getMultiLineCommentEnd() {
        return this.#multiLineComment.end;
    }

    setMultiLineComment(start, end) {
        if (start !== this.#multiLineComment.start || end !== this.#multiLineComment.end) {
            this.#multiLineComment.start = start;
            this.#multiLineComment.end = end;
            this.refreshSelfRegex();
        }
    }

    getStringChars() {
        return this.#stringChars;
    }

    setStringChars(...stringChars) {
        this.#stringChars = [];
        for (const stringChar of stringChars) {
            this.#stringChars.push(stringChar);
        }
        this.refreshSelfRegex();
    }

    addStringChar(stringChar) {
        let i = 0;
        while (i < this.#stringChars.length && this.#stringChars[i] !== stringChar) {
            i++;
        }
        if (i < this.#stringChars.length) {
            this.#stringChars.push(stringChar);
            this.refreshSelfRegex();
        }
    }

    getColumnStringStart() {
        return this.#columnStringCharPair.start;
    }

    getColumnStringEnd() {
        return this.#columnStringCharPair.end;
    }

    setColumnString(start, end) {
        if (start !== this.#columnStringCharPair.start || end !== this.#columnStringCharPair.end) {
            this.#columnStringCharPair.start = start;
            this.#columnStringCharPair.end = end;
            this.refreshSelfRegex();
        }
    }

    getLineBreak() {
        return this.#lineBreak;
    }

    setLineBreak(identifier) {
        if (identifier !== this.#lineBreak) {
            this.#lineBreak = identifier;
            this.refreshSelfRegex();
        }
    }

    static createRegexPartEscapableString(charStart, charEnd = null) {
        if (charEnd === null) {
            charEnd = charStart;
        }
        return `(?:${charStart}(?:(?:[\\].|[^${charEnd}])*)${charEnd})`;
    }

    static createGroupColumnString(charStart, charEnd = null) {
        if (charEnd === null) {
            charEnd = charStart;
        }
        return `(?<column_string>${charStart}[^${charEnd}]*${charEnd})`;
    }

    static createNamedGroup(groupName, ...regexGroups) {
        return `(?<${groupName}>${this.chainRegexGroup(...regexGroups)})`
    }

    static createGroupSingleLineComment(commentStart) {
        return `(?<sl_comment>(?:${commentStart}([^\n])*\n)|(${commentStart}([^\n])*$))`;
    }

    static createGroupMultiLineComment(commentStart, commentEnd = null) {
        if (commentEnd === null) {
            commentEnd = commentStart;
        }
        return `(?<ml_comment>${commentStart}(?:${commentEnd}){0}.*?${commentEnd})`;
    }

    static createGroupDelimiter(delimiter = " ") {
        return `(?<delimiter>${delimiter}|\n|\t)`;
    }

    static createGroupLineBreak(charFor) {
        return `(?<line_break>${charFor})`;
    }

    static createGroupToken(multiLineCommentStart,lineBreak, ...stringCharacters) {
        let stringChars = "";
        for (const stringChar of stringCharacters) {
            stringChars = stringChars.concat(stringChar);
        }
        return `(?<token>(?:(?!${multiLineCommentStart})(?:[^${lineBreak}${stringChars} ]))+)`;
    }

    static chainRegexGroup(...regexGroups) {
        let chainedString = "";
        for (const group of regexGroups) {
           chainedString = chainedString.concat("|", group);
        }
        return chainedString.substring(1);
    }

    getFullRegex() {
        let stringParts = [];
        for (const stringChar of this.#stringChars) {
            stringParts.push(Slicer.createRegexPartEscapableString(stringChar))
        }
        return new RegExp(
            Slicer.chainRegexGroup(
                Slicer.createNamedGroup("string", ...stringParts),
                Slicer.createGroupColumnString(this.#columnStringCharPair.start, this.#columnStringCharPair.end),
                Slicer.createGroupSingleLineComment(this.#singleLineComment),
                Slicer.createGroupMultiLineComment(this.#multiLineComment.start, this.#multiLineComment.end),
                Slicer.createGroupLineBreak(this.#lineBreak),
                Slicer.createGroupDelimiter(),
                Slicer.createGroupToken(this.#multiLineComment.start,this.#lineBreak, ...this.#stringChars)
            )
            ,"gusi"
        )
    }

    refreshSelfRegex() {
        this.#regex = this.getFullRegex();
    }

    splitText(text) {
        let matches = [];
        for (const match of text.matchAll(this.#regex)) {
            let i = 0;
            while (i < Object.keys(match.groups).length && match.groups[Object.keys(match.groups)[i]] === undefined) {
                i++;
            }
            matches.push({content:match[0], index:match.index, group: Object.keys(match.groups)[i]});
        }
        return matches;
    }
}
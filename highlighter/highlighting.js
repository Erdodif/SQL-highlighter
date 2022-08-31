import React from "react";
import dictionary from "./dictionary.json";

export default class Highlighter {
    static getHighlighted(content) {
        this.Scope = new EditorCutter();
        this.Scope.readScope(content);
        return this.Scope;
        //return content;
    }

}


class EditorCutter {
    constructor(depth = 0, separator = " ") {
        this.level = depth;
        this.separator = separator
        this.components = [];
    }

    static cutStrings(string) {
        //let regex = /("([\\].|[^"])?")?|('([\\].|[^'])?')?|(`([\\].|[^`])?`)?/gu
        let regex = /("([\\].|[^"])*")?/gu
        let strings = string.match(regex);
        if(strings !== null){
            for (const match of strings){
                console.log(match);
            }
        }
        let components = string.replace(regex," ").split(" ");
        return {
            between: components,
            strings: strings
        };
    }
}

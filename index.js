import Console, { log } from 'console';
import { promises as fs, readFile } from 'fs';
import colours from './printer/Colours.js';
import Slicer from './parsing/Slicer.js';
import Syntax from './parsing/Syntax.js';
import Printer from './printer/Printer.js';
import Token from './parsing/Token.js';

let dictionary = await JSON.parse(await fs.readFile(new URL("./highlighter/dictionary.json" , import.meta.url)));
format();

/("([\\].[^"]*)")|("[^\\"]*")|('([\\].[^']*)')|('[^']*')|(`[^`]*`)/gus



async function format() {
    try{
        let syntax = new Syntax(new URL("./highlighter/dictionary.json" , import.meta.url), new Slicer());
        let data = await fs.readFile('./toFormat.txt', {encoding:'utf8'});
        let regex = /("(?:[\\].|[^"])*")/gu ;
        let lines = data.replace(/\n/, ' ').split(regex);
        console.log(lines);
        for (var token of lines) {
            if (token.match(regex)) {
                Printer.print(colours.fg.magenta, `${token}, string`);
            }
            else {
                for (var word of token.split(/ /gu)) {
                    let dictMatch = syntax.getToken(word);
                    if (dictMatch !== null) {
                        Printer.print(colours.fg.blue, `${word}, ${dictMatch.getMain()}.${dictMatch.getSide()}`);
                    }
                    else {
                        if (word != null && word != "" && word != " " && word != "\n") {
                            Printer.print(colours.fg.yellow, `${word}, unknown`);
                        }
                    }
                }
            }
        }
    }catch(e){
        Console.error(e);
    }
}

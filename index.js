import Console, { log } from 'console';
import { promises as fs, readFile, readFileSync, realpath } from 'fs';
import Argument from "./parsing/Argument.js";
import Printer from './printer/Printer.js';
import colours from './printer/Colours.js';
import Slicer from './parsing/Slicer.js';
import Syntax from './parsing/Syntax.js';
import Token from './parsing/Token.js';

let dictionary = new Syntax('./highlighter/dictionary.json');
let slicer = new Slicer();
let data = await fs.readFile('./toFormat.txt', {encoding:'utf8'});
let matches = slicer.splitText(data);
console.log(matches);
for (const match of matches){
    if(match.group !== "token"){
        Printer.print(colours.fg.white, match.content);
        continue;
    }
    let dictMatch = dictionary.getTokenByKey(match.content);
    if (dictMatch !== null) {
        Printer.print(colours.fg.blue, `${match.content}, ${dictMatch.getMain()}.${dictMatch.getSide()}`);
    }
    else {
        if (match.content != null && match.content != "" && match.content != " " && match.content != "\n") {
            Printer.print(colours.fg.yellow, `${match.content}, unknown`);
        }
    }
}
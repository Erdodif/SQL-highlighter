import Console, { log } from 'console';
import { promises as fs, readFile } from 'fs';
import colours from './colours.js';

let dictionary = await JSON.parse(await fs.readFile(new URL("./highlighter/dictionary.json" , import.meta.url)));
format();

/("([\\].[^"]*)")|("[^\\"]*")|('([\\].[^']*)')|('[^']*')|(`[^`]*`)/gus



async function format() {
    try{
        let data = await fs.readFile('./toFormat.txt', {encoding:'utf8'});
        let regex = /("(?:[\\].|[^"])*")/gu
        let lines = data.replace(/\n/, ' ').split(regex);
        console.log(lines);
        for (var token of lines) {
            if (token.match(regex)) {
                logColour(colours.fg.magenta, `${token}, string`);
            }
            else {
                for (var word of token.split(/ /gu)) {
                    let dictMatch = getToken(word)
                    if (dictMatch !== null) {
                        logColour(colours.fg.blue, `${word}, ${dictMatch.main}.${dictMatch.side}`);
                    }
                    else {
                        if (word != null && word != "" && word != " " && word != "\n") {
                            logColour(colours.fg.yellow, `${word}, unknown`);
                        }
                    }
                }
            }
        }
    }catch(e){
        Console.error(e);
    }
}

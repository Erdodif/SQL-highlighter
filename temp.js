import { Console , log} from "console";
import Argument from "./parsing/Argument.js";
import { readFile } from "fs";
import Slicer from "./parsing/Slicer.js";
import Syntax from "./parsing/Syntax.js";

let dict = new Syntax("./highlighter/dictionary.json",new Slicer());
console.log(dict);
console.log(`${dict.getToken(100).getName()}\n${dict.getToken(100).getSide()}\n${dict.getToken(100).getDescription()}`);
readFile('./toFormat.txt', {encoding:'utf8'},(err,data)=>{
    console.log(dict.slicer.splitString(data));
});

process.openStdin().addListener("data", function(d){
    console.log(`${d} \t ${dict.getTokenByKey(d)}`);
});
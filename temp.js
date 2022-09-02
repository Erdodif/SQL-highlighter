import { Console , log} from "console";
import Argument from "./parsing/Argument.js";
import { readFile } from "fs";
import Slicer from "./parsing/Slicer.js";
import Syntax from "./parsing/Syntax.js";

let dict = new Syntax("./highlighter/dictionary.json",new Slicer());
readFile('./toFormat.txt', {encoding:'utf8'},(err,data)=>{
    console.log(dict.slicer.splitString(data));
});
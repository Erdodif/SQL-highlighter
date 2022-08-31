import { Console , log} from "console";
import Slicer from "./parsing/Slicer.js";

let slicer = new Slicer();
log(
slicer.splitString('SELECT * FROM `question` where question.title like "%Moma%";'));
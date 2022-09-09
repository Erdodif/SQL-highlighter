import colours from "./Colours.js";
export default class Printer {
    static print(colour, string) {
        console.log(`${colour}${string}${colours.reset}`);
    }

    static printMultipart(multipart){
        let temp = "";
        temp.concat(...multipart);
        temp.concat(colours.reset);
        console.log(temp);
    }
}
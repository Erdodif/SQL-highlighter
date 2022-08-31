import colours from "../colours";
export default class Printer {
    print(colour, string) {
        console.log(`${colour}${string}${colours.reset}`);
    }

    printMultipart(multipart){
        let temp = "";
        temp.concat(...multipart);
        temp.concat(colours.reset);
        console.log(temp);
    }
}
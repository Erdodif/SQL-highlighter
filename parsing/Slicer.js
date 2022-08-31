export default class Slicer{
    #defaultEscapeDelimiters = ["\"","\'"]
    #defaultStaticDelimiters = ["\`"]

    setDefaultDelimiters(escapeDelimiters,staticDelimiters){
        this.#defaultEscapeDelimiters = escapeDelimiters;
        this.#defaultStaticDelimiters = staticDelimiters;
    }

    getDefaultEscapeDelimiters(delimiters){
        return this.#defaultEscapeDelimiters;
    }

    getDefaultStaticDelimiters(delimiters){
        return this.#defaultStaticDelimiters;
    }

    #createEscapeRexexPart(charFor){
        return `(${charFor}([\\\\].[^${charFor}]*)${charFor})|(${charFor}[^\\\\${charFor}]*")`;
    }

    #sliceString(text) {
        return text.split(text,/("[^\\"]*([\\].)*[^\\"]*")|("[^\\"]*")/gus );
    }
    
    sliceStringDefault(text) {
        return text.split(text, /("([\\].[^"]*)")|("[^\\"]*")|('([\\].[^']*)')|('[^']*')|(`[^`]*`)/gus);
    }
    
    
    sliceStringBySingle(text,charFor) {
        if(charFor.length !== 1){
            throw new Error(`A karakterlánc szeleteléséhez egy karakter a megengedett (${charFor})`);
        }
        return text.split(text,`/(${charFor}[^\\\\${charFor}]*([\\\\].)*[^\\\\${charFor}]*${charFor})|(${charFor}[^\\\\${charFor}]*${charFor})/gus` );
    }
}
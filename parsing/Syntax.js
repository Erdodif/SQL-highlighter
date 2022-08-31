export default class Syntax{
    findTokenInfo(key) {
        key = key.toLowerCase();
        for (var i = 0; i < dictionary.length; i++) {
            if (dictionary[i].name == key) {
                return dictionary[i];
            }
        }
        return null;
    }
}
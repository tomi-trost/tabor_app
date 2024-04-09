export class StorageManager {

    static saveNodeTemporarily(tag, node) {
        try{
            sessionStorage.setItem(tag, JSON.stringify(node));
        }
        catch (error) {
            console.log(node);
        }
    }

    static getTemporarilySavedNode(tag) {
        const node = sessionStorage.getItem(tag);
        return JSON.parse(node);
    }

    
}
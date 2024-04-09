import { Position } from "./Position.js";
import { Size } from "./Size.js";

export class Element {

    constructor({
        position = new Position(),
        size = new Size(),
    } = {}) {
        this.position = position;
        this.size = size;
    }

    clone() {
        return new Element({ ...this });
    }
}

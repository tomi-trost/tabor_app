export class Size {

    constructor({
        width = 0,
        height = 0,
    } = {}) {
        this.width = width;
        this.height = height;
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }
}
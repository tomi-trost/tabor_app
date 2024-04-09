export class Position {

    constructor({
        x = 0,
        y = 0,
    } = {}) {
        this.x = x;
        this.y = y;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    moveRight(amount) {
        this.x += amount;
    }

    moveLeft(amount) {
        this.x -= amount;
    }

    moveUp(amount) {
        this.y -= amount;
    }

    moveDown(amount) {
        this.y += amount;
    }
}
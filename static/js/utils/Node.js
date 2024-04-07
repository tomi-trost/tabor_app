import { Position } from './Position';
import { Size } from './Size';
import { Tooltip } from './Tooltip';

export class Node {

    constructor({
        name = '',
        type = None,
        position = new Position(),
        size = new Size(),
        tooltip = new Tooltip(),
        icon = new Image(),
    } = {}) {
        this.name = name;
        this.type = type;
        this.position = position;
        this.size = size;
        this.tooltip = tooltip;
        this.icon = icon;
    }

}
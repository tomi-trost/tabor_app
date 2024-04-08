import { Position } from './Position.js';
import { Size } from './Size.js';
import { Tooltip } from './Tooltip.js';

export class Node {

    constructor({
        name = '',
        type = null,
        position = new Position(),
        size = new Size(),
        tooltip = new Tooltip(),
        icon = null,
        children = [],
        parent = null
    } = {}) {
        this.name = name;
        this.type = type;
        this.position = position;
        this.size = size;
        this.tooltip = tooltip;
        this.icon = icon;
        this.children = children;
        this.parent = parent;
    }

}
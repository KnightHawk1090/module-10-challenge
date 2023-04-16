const { shape, circle, triangle, rect } = require('svg.js');
// The base class for the logo shapes
class logoShape extends shape {
    constructor(x, y, size, color) {
        super();
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }
}

// class that will create a circle shape for the logo. 
class logocircle extends logoShape {
    constructor(cx, cy, r, color) {
        super(cx - r, cy - r, r*2, color);
        this.circle = new circle().cx(cx).cy(cy).r(r).fill(color);
        this.add(this.circle);
    }
}

// class that will create a triangle shape for the logo
class logoTriangle extends logoShape {
    constructor(x, y, size, color) {
        super(x, y, size, color);
        const points = `${x + size / 2}, ${ y + size} ${x}, ${y} ${x + size}, ${y}`;
        this.triangle = new triangle().plot(points).fill(color);
        this.add(this.triangle);
    }
}

// class that will create a square shape for the logo
class logoSquare extends logoShape {
    constructor(x, y, size, color) {
        super(x, y, size, color);
        this.rect = new rect().x(x).y(y).size(size).fill(color);
        this.add(this.rect);
    }
}

module.exports = {
    logocircle,
    logoTriangle,
    logoSquare

};
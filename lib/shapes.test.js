// get shape classes from shapes.js
const {triangle, square, circle} = require('./shapes.js');

// test for triangle with red background
describe('Triangle Test', () => {
    test('test for a triangle with a red backgroud', () => {
        const shape = new triangle();
        shape.setColor('red');
        expect(shape.render()).toEqual('<polygon points = "140, 18 240, 180 56, 180" fill = "red" />');
    });
});

// test for a circle with a #ca00ca background
describe('Circle Test', () => {
    test('test for a circle wit a #ca00ca background', () => {
        const shape = new circle();
        shape.setColor('#ca00ca');
        expect(shape.render()).toEqual('<circle cs = "150" cy = "80" fill = "#ca00ca" />');
    });
});


// test for square with a yellow background
describe('Square Test', () => {
    test('test for a square with a yellow background', () => {
        const shape = new square();
        shape.setColor('yellow');
        expect(shape.render()).toEqual('<rect x = "70" y = "45" width = "140" height = "150" fill = "yellow" />');
    });
});
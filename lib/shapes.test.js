// get shape classes from shapes.js
const {triangle, square, circle} = require('./shapes.js');

// test for triangle with red background
describe('Triangle Test', () => {
    test('test for a triangle with a red backgroud', () => {
        const shape = new triangle();
        shape.setColor('red');
        expect(shape.render()).toEqual('<polygon points="150, 18 244, 182 56, 182" fill="red" />');
    });
});

// test for a circle with a #ca00ca background
describe('Circle Test', () => {
    test('test for a circle wit a #ca00ca background', () => {
        const shape = new circle();
        shape.setColor('#ca00ca');
        expect(shape.render()).toEqual('<circle cx="150" cy="115" r="80" fill="#ca00ca" />');
    });
});


// test for square with a yellow background
describe('Square Test', () => {
    test('test for a square with a yellow background', () => {
        const shape = new square();
        shape.setColor('yellow');
        expect(shape.render()).toEqual('<rect x="73" y="40" width="160" height="160" fill="yellow" />');
    });
});
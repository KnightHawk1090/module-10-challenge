// Inquirer impot
const inquirer = require('inquirer');
// require the fs package for working with the files
const fs = require('fs');
// import classes in ./lib/shopes.js
const {triangle, square, circle} = require('./lib/shapes');

// write the SVG file using answers from user imputs
function createFile(fileName, answers) {
    // begin with empty string
    let svgString = '';

    // set width and height of container
    svgString = '<svg version = "1.1" width = "300" height = "200" xmlns = "http://www.w3.org/2000/svg">';

    svgString += "<g>";

    svgString += `${answers.shape}`;

    let shapeChoice; 
    if (answers.shape === "triangel") {
        shapeChoice = new triangle();
        svgString += `<polygon points = "150, 18 244, 182 56, 182" fill = "${answers.shapeBackGroundColor}"/>`;

    } else if (answers.shape === "square") {
        shapeChoice = new square();
        svgString += `<rect x = "73" y = "40" width = "160" height = "160" fill = "${answers.shapeBackGroundColor}"/>`;

    }else {
        shapeChoice = new circle();
        svgString += `<circle cs = "150" cy = "115" r = "80" fill = "${answers.shapeBackGroundColor}"/>`;
        
    }
}
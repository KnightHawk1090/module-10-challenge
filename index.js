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
    if (answers.shape === "triangle") {
        shapeChoice = new triangle();
        svgString += `<polygon points = "150, 18 244, 182 56, 182" fill = "${answers.shapeBackGroundColor}"/>`;

    } else if (answers.shape === "square") {
        shapeChoice = new square();
        svgString += `<rect x = "73" y = "40" width = "160" height = "160" fill = "${answers.shapeBackGroundColor}"/>`;

    }else {
        shapeChoice = new circle();
        svgString += `<circle cs = "150" cy = "115" r = "80" fill = "${answers.shapeBackGroundColor}"/>`;
        
    }

    // give text alignment, content, and color that is taken from the user inputs. 
    svgString += `<text x = "150" y = "130" text-anchor = "middle" font-size = "30" fill = "${answers.textColor}">${answers.text}</text>`;
    svgString += "</g>";
    svgString += "</svg>";

    // fs module to create svg file. take user imput for file name. 
    fs.writeFile(fileName, svgString, (err) => {
        err ? console.log(err) : console.log("Created logo.svg");
    });
}

// use inquirer to ask user questions in the command line
function promptUser() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What text would you like the logo to show? (Enter up to three Characters)',
            name: 'text',
        },

        {
            type: 'input',
            message: 'Choose the test color (Enter color keyword or a hexadecimal number)',
            name: 'textColor',
        },

        {
            type: 'input',
            message: 'What shape would you like the logo to be?',
            choices: ['Triangle', 'Square', 'Circle'],
            name: 'shape',
        },

        {
            type: 'input',
            message: 'Choose the color of the shape (Enter color keyword or hexadecimal number)',
            name: 'shapeBackGroundColor',
        },
    ])

    // error message if more than three characters is entered 
    .then((answers) => {
        if(answers.text.length > 3) {
            console.log('Must enter a value of no more than 3 characters');
            promptUser();

        } else {
            writeToFile('logo.svg', answers);
        }
    });
}

promptUser();

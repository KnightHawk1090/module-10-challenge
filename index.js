const fs = require('fs');
const { Triangle, Square, Circle } = require('./lib/shapes.js');
const express = require('express');
const PORT = 2000;
const app = express();

app.use(express.static('public'));

// route for the logo.svg file
app.get('/logo.svg', (req, res) => {
    const logoFile = `/logo.svg`;
    res.sendFile(logoFile);
});

(async function() {
  let inquirer;
  try {
    // Use dynamic import to load inquirer
    const inquirerModule = await import('inquirer');
    inquirer = inquirerModule.default;

  } catch (err) {
    console.error('Failed to load inquirer module:', err);
    process.exit(1);
  }

  // write the SVG file using answers from user inputs
  async function createFile(fileName, answers) {
    // begin with empty string
    let svgString = '';

    // set width and height of container
    svgString = '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/logo.svg">';

    svgString += '<g>';

    svgString += `${answers.shape}`;

    let shapeChoice;

    if (answers.shape === 'Triangle') {
      shapeChoice = new Triangle();
      svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackGroundColor}"/>`;

    } else if (answers.shape === 'Square') {
      shapeChoice = new Square();
      svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackGroundColor}"/>`;

    } else {
      shapeChoice = new Circle();
      svgString += `<circle cs="150" cy="115" r="80" fill="${answers.shapeBackGroundColor}"/>`;
    }

    // give text alignment, content, and color that is taken from the user inputs.
    svgString += `<text x="150" y="130" text-anchor="middle" font-size="30" fill="${answers.textColor}">${answers.text}</text>`;
    svgString += '</g>';
    svgString += '</svg>';

    try {
      // fs module to create svg file. take user input for file name.
      await fs.writeFile(fileName, svgString, () => {});
      console.log(`Created ${fileName}`);
    } catch (err) {
      console.error('Failed to create SVG file:', err);
    }
  }

  // use inquirer to ask user questions in the command line
  async function promptUser() {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        message: 'What text would you like the logo to show? (Enter up to three Characters)',
        name: 'text',
      },
      {
        type: 'input',
        message: 'Choose the text color (Enter color keyword or a hexadecimal number)',
        name: 'textColor',
      },
      {
        type: 'list',
        message: 'What shape would you like the logo to be?',
        choices: ['Triangle', 'Square', 'Circle'],
        name: 'shape',
      },
      {
        type: 'input',
        message: 'Choose the color of the shape (Enter color keyword or hexadecimal number)',
        name: 'shapeBackGroundColor',
      },
    ]);

    // error message if more than three characters is entered
    if (answers.text.length > 3) {
      console.log('Must enter a value of no more than 3 characters');
      await promptUser();
    } else {
      await createFile('logo.svg', answers);
      console.log('Generated logo.svg');
    }
  }

  promptUser();

})();


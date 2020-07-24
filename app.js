const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
​
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
​
const render = require("./lib/htmlRenderer");
​
​
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
​
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
​
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
​
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
​
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
const employees = [];
const teamName = "Software Team";


function createTeam () {
  console.log("Building Team");

  inquirer.prompt([
    {
      type: "input",
      name: "managerName",
      message: "Manager's Name?",
      validate: answer => {
        if ( answer !== "" ) {
          return true;
        } 
        return "Enter The Mangers Name!"
      }
    },
    {
      type: "input",
      name: "managerId",
      message: "Manager's ID?",
      validate: answer => {
        const pass = answer.match(
          /^[1-9]\d*$/
        );
        if ( pass ) {
          return true;
        }
        return "Enter Id Number";
      }
    },
    {
      type: "input",
      name: "managerEmail",
      message: "Manager's Email?",
      validate: answer => {
        const pass = answer.match(
          /\S+@\S+\.\S+/
        );
        if ( pass ) {
          return true;
        }
        return "Enter a valid email address.";  
      }
    },
    {
      type: "input",
      name: "managerOfficeNumber",
      message: "Manager's office number?",
      validate: answer =>{
        const pass = answer.match(
          /^[1-9]\d*$/
        );
        if ( pass ) {
          return true;
        }
        return "Enter A Valid Number"
      } 
      
    }
  ]).then( answer => {
      const manager = new Manager( answer.managerName, answer.managerId, answer.managerEmail, answer.managerOfficeNumber);
      console.log(manager);
      employees.push(manager);
      createTeam();
  });
}

function createTeam() {
  console.log(" Creating Team.");
  inquirer.prompt(
    {
      type: "list",
      name: "memberChoice",
      message: "Who Would You Like To Add??",
      choices: [
        "Engineer",
        "Intern",
        "Ready To Create Team Profile"
      ]
    }
  ).then( response => {
    console.log(response);
    switch( response.memberChoice ) {
      case "Engineer":
        createEngineer();
        break;
      case "Intern":
        createIntern();
        break;
      default:
        buildTeam();
    }
    
  });
}

function createEngineer() {
  console.log("Creating Engineer.");
  inquirer.prompt([
    {
      type: "input",
      name: "engineerName",
      message: "Engineer's name?",
      validate: answer => {
        if ( answer !== "") {
          return true;
        }
        return "Enter Engineer's Name.";
      }
    },
    {
      type: "input",
      name: "engineerId",
      message: "Engineer's Id?",
      validate: answer => {
        const pass = answer.match(
          /^[1-9]\d*$/
        );
        if ( pass ) {
          return true;
        }
        return "Enter Engineer's Id .";
      }
    },
    {
      type: "input",
      name: "engineerEmail",
      message: "Engineer's Email?",
      validate: answer => {
        const pass = answer.match(
          /\S+@\S+\.\S+/
        );
        if ( pass ) {
          return true;
        }
        return "Enter A Valid Email Address."
      }
    },
   
  ]).then( answer => {
    const engineer = new Engineer(answer.engineerName, answer.engineerId, answer.engineerEmail);
    employees.push(engineer);
    createTeam();
  });

}

function createIntern() {
  console.log("Creating Intern");
  inquirer.prompt([
    {
      type: "input",
      name: "internName",
      message: "Intern's Name?",
      validate: answer => {
        if ( answer !== "" ) {
          return true;
        }
        return "Enter The Intern's Name.";
      }
    },
    {
      type: "input",
      name: "internId",
      message: "Interns ID?",
      validate: answer => {
        const pass = answer.match(
          /^[1-9]\d*$/
        );
        if ( pass ) {
          return true;
        }
        return "Enter Valid ID.";
      }
    },
    {
      type: "input",
      name: "internEmail",
      message: "Intern's Email?",
      validate: answer => {
        const pass = answer.match(
          /\S+@\S+\.\S+/
        );
        if ( pass ) {
          return true;
        }
        return "Enter A Valid Email Address.";
      }
    },
    {
      type: "input",
      name: "internSchool",
      message: "Intern's School?",
      validate: answer => {
        if ( answer !== "") {
          return true;
        }
        return "Please enter intern's school.";
      }
    }

    ]).then( answer => {
      const intern = new Intern(answer.internName, answer.internId, answer.internEmail, answer.internSchool);
      employees.push(intern);
      createTeam();
    });
  }

function buildTeam() {
  fs.writeFileSync(OUTPUT_DIR,render(employees),"UTF-8");
}

createTeam();

function renderHTML() {
  const html = render(employees, teamName);
  console.log(teamName);
  fs.writeFileSync(`${OUTPUT_DIR}/${teamName}.html`, html);
}
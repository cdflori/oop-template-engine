const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const yourTeam = [];
const teamID = [];

function teamMenu() {

    // Adding user prompt for Manager Role
    async function createManager() {
        const response = await inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "Enter your manager's name",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    } else {
                        throw err("Please enter your manager's name");
                    }
                }
            },

            {
                type: "input",
                name: "managerID",
                message: "Enter your manager's ID",
                validate: answer => {
                    if (answer.match(/^[0-9]\d*$/)) {
                        return true;
                    } else {
                        throw err("Please enter a numeric value")
                    }
                }
            },

            {
                type: "input",
                name: "managerEmail",
                message: "Enter your manager's email",
                validate: answer => {
                    if (answer.match(/\S+@\S+\.\S+/)) {
                        return true;
                    } else {
                        throw err("Please enter a valid email address.")
                    }
                }
            },

            {
                type: "input",
                name: "managerOfficeNum",
                message: "Enter your manager's phone number",
                validate: answer => {
                    if (answer.match(/^[0-9]\d*$/)) {
                        return true;
                    } else {
                        throw err("Please enter a valid phone number.")
                    }
                }
            }


        ]);
        const newManager = new Manager(
            response.managerName,
            response.managerID,
            response.managerEmail,
            response.managerOfficeNum

        );
        yourTeam.push(newManager);
        teamID.push(response.managerID);
        createTeam();
    };

    async function createTeam() {
        const response = await inquirer.prompt([
            {
                type: "list",
                name: "teamSelector",
                message: "Please select a team member to add.",
                choices: [
                    "Engineer",
                    "Intern",
                    "I'm done building my team."
                ]
            }
        ]);
        switch (response.teamSelector) {
            case "Engineer": createEngineer();
                break;
            case "Intern": createIntern();
                break;
            default: renderTeam();

        };

    }




    // Adding user prompt for Engineer Role
    async function createEngineer() {
        const response = await inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "Enter your engineer's name",
                validate: answer => {
                    if (answer.trim() !== "") {
                        return true;
                    } else {
                        throw err("Please enter your engineer's name");
                    }
                }
            },

            {
                type: "input",
                name: "engineerID",
                message: "Enter your engineer's ID",
                validate: answer => {
                    if (answer.match(/^[0-9]\d*$/)) {
                        return true;
                    } else {
                        throw err("Please enter a numeric value")
                    }
                }
            },

            {
                type: "input",
                name: "engineerEmail",
                message: "Enter your engineer's email.",
                validate: answer => {
                    if (answer.match(/\S+@\S+\.\S+/)) {
                        return true;
                    } else {
                        throw err("Please enter a valid email address.")
                    }
                }
            },

            {
                type: "input",
                name: "engineerGithub",
                message: "Enter your github's username",
                validate: answer => {
                    if (answer.trim() !== "") {
                        return true;
                    } else {
                        throw err("Please enter a valid username.")
                    }
                }
            }


        ]);
        const newEngineer = new Engineer(
            response.engineerName,
            response.engineerID,
            response.engineerEmail,
            response.engineerGithub

        );
        yourTeam.push(newEngineer);
        teamID.push(response.engineerID);
        createTeam();


    }

    // Adding user prompt for Intern Role
    async function createIntern() {
        const response = await inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "Enter your intern's name",
                validate: answer => {
                    if (answer.trim() !== "") {
                        return true;
                    } else {
                        throw err("Please enter your intern's name");
                    }
                }
            },

            {
                type: "input",
                name: "internID",
                message: "Enter your intern's ID",
                validate: answer => {
                    if (answer.match(/^[0-9]\d*$/)) {
                        return true;
                    } else {
                        throw err("Please enter a numeric value")
                    }
                }
            },

            {
                type: "input",
                name: "internEmail",
                message: "Enter your intern's email.",
                validate: answer => {
                    if (answer.match(/\S+@\S+\.\S+/)) {
                        return true;
                    } else {
                        throw err("Please enter a valid email address.")
                    }
                }
            },

            {
                type: "input",
                name: "internSchool",
                message: "Enter your intern's school name",
                validate: answer => {
                    if (answer.trim() !== "") {
                        return true;
                    } else {
                        throw err("Please enter a valid school name.")
                    }
                }
            }


        ]);
        const newIntern = new Intern(
            response.internName,
            response.internID,
            response.internEmail,
            response.internSchool

        );
        yourTeam.push(newIntern);
        teamID.push(response.internID);
        createTeam();

    }

// Function to render Manager HTML Card

    function renderTeam() {
        fs.writeFileSync(outputPath, render(yourTeam), "utf8");
    }

    createManager();

}

teamMenu();



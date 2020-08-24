const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { inherits } = require("util");
const Choices = require("inquirer/lib/objects/choices");

const teamStore = [];

function newMember() {
    inquirer.prompt([
        {
            type: "list",
            name: "type",
            message: "Who do you want to add to your team?",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "I think I'm good"
            ]
        }
    ]).then(function(userRes) {
        switch (userRes.type) {
            case "Manager":
                inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "Enter your manager's name",
                    },
                    {
                        type: "input",
                        name: "id",
                        message: "What's their ID?"
                    },
                    {
                        type: "input",
                        name: "email",
                        message: "Do they have an email?"
                    },
                    {
                        type: "input",
                        name: "phone",
                        message: "How about their phone number?"
                    }
                ]).then(userRes => {
                    const manager = new Manager(userRes.name, userRes.id, userRes.email, userRes.phone)
                    teamStore.push(manager);
                    newMember()
                })
                break;
            case "Engineer":
                inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "Enter your engineer's name",
                    },
                    {
                        type: "input",
                        name: "id",
                        message: "What's their ID?"
                    },
                    {
                        type: "input",
                        name: "email",
                        message: "Do they have an email?"
                    },
                    {
                        type: "input",
                        name: "phone",
                        message: "How about their github @?"
                    }
                ]).then(userRes => {
                    const engineer = new Engineer(userRes.name, userRes.id, userRes.email, userRes.phone)
                    teamStore.push(engineer);
                    newMember()
                })
                break;
            case "Intern":
                inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "Enter your intern's name",
                    },
                    {
                        type: "input",
                        name: "id",
                        message: "What's their ID?"
                    },
                    {
                        type: "input",
                        name: "email",
                        message: "Do they have an email?"
                    },
                    {
                        type: "input",
                        name: "phone",
                        message: "What school do they go to?"
                    }
                ]).then(userRes => {
                    const intern = new Intern(userRes.name, userRes.id, userRes.email, userRes.phone)
                    teamStore.push(intern);
                    newMember()
                })
                break;
            default:
                writeMeBabyOneMoreTime("output/team.html", render(teamStore))
        };
    });
};

function writeMeBabyOneMoreTime(fileName, data) {
    console.log("Say hi to your new team!")
    fs.writeFile(fileName, data, function (err, response) {
        process.exit()
    })
}

function init() {
    newMember()
}

init();
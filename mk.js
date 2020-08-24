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

function teamPrompts(){
    return inquirer.prompt([
    {
        type: "input",
        message: "What's your employee's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What's your employee's id number?",
        name: "id"
    },
    {
        type: "input",
        message: "What's your employee's email?",
        name: "email"
    },
    {
        type: "list",
        message: "What does your employee do?",
        name: "role",
        choices: [
            "Manager",
            "Engineer",
            "Intern"
        ]
    }
])}

async function init(){
    try{
        const member = await teamPrompts();
        name = member.name;
        id = member.id;
        role = member.role;
        email = member.email;

        if(role[0] === "Manager"){
            makeManager();
        }
        else if (role[0] === "Engineer"){
            makeEngineer();
        }
        else if (role[0] === "Intern"){
            makeIntern();
        }  
    }catch(err){
        console.log(err);
    }
}
    function makeManager() {
    return inquirer.prompt([
        {
            type: "input",
            name: "officeNumber",
            message: "What's your manager's office number?",
        },
        {
            type: "checkbox",
            name: "addAnother",
            message: "Who else do you want to add?",
            choices: [
                "Engineer",
                "Intern",
                "All done!!"
            ],
        },
    ])}
    inquirer.prompt(teamPrompts).then(function (res) {
        const manager = new Manager(res.name, res.id, res.email, res.officeNumber)
        teamStore.push(manager);
        
        if(data.addAnother[0] === "Yes"){
            init();
        }
        else{
            render(teamDataArray);
        }
        
    });


    function makeEngineer() {

    return inquirer.prompt([
        {
            type: "input",
            name: "githubAt",
            message: "What's your engineer's github @?"
        },
        {
            type: "checkbox",
            name: "addAnother",
            message: "Anyone else you want to add?",
            choices: [
                "Intern",
                "All done!!"
            ]
        },
    ]);

    function makeEngineer() {
        inquirer.prompt(teamPrompts).then(function (res) {
            const engineer = new Engineer(res.name, res.id, res.email, res.officeNumber)
            teamStore.push(engineer);
            
            if(data.addAnother[0] === "Yes"){
                init();
            }
            else{
                render(teamDataArray);
            }
            
        });
    }
    }

    function makeIntern() {

    return inquirer.prompt([
        {
            type: "input",
            name: "skoo",
            message: "Where's your intern going for school?"
        },
        {
            type: "checkbox",
            name: "addAnother",
            message: "Anyone else you want to add?",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "All done!!"
            ]
        },
    ]);

    function makeIntern() {
        inquirer.prompt(teamPrompts).then(function (res) {
            const intern = new Intern(res.name, res.id, res.email, res.officeNumber)
            teamStore.push(intern);
            
            if(data.addAnother[0] === "Yes"){
                init();
            }
            else{
                render(teamDataArray);
            }
            
        });
    }
}

init();
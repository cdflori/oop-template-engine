// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email) {
    super(name, id, email)
    this.school = this.school;
}

getRole(){
    return "Intern";
}

getSchool(){
    return this.school;
}

}

module.exports = Intern

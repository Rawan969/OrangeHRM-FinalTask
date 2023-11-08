import AddEmployee from "../../support/helpers/addEmployeeHelper";
let empNumber: any;
let employees: any = [];
export default class GenerateEmployee {
    static generateEmp() {
        for (let i = 0; i < 3; i++) {
            AddEmployee.addNewEmployee().then((resolve) => {
                empNumber = `${resolve}`;
                console.log(empNumber)
                employees.push(empNumber);
                AddEmployee.addJobDetails(empNumber)
                AddEmployee.addSalary(empNumber)
            })
        }
        return employees
    }
}
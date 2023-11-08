import EmployeeInit from "../init/EmployeeInit";

const baseUrl = Cypress.config().baseUrl
export const URLs={
    employee:`${baseUrl}/web/index.php/api/v2/pim/employees`,
}
export let empId :number;
export default class addEmployee{
    static addNewEmployee() {
        return cy.apis('POST', URLs.employee, EmployeeInit.initEmployee())
          .then((response) => {
            if (response.data && response.data.empNumber) {
              empId = response.data.empNumber;
              console.log(empId);
              return empId;
            } else {
              throw new Error('Invalid employee data or missing empNumber');
            }
          });
      }
      
/*static async addNewEmployee(){ 
    return new Cypress.Promise((resolve, reject) => {
            cy.apis('POST', URLs.employee, EmployeeInit.initEmployee()).then((response) => {
            empId = response.data.empNumber;
            resolve(empId);
            console.log(empId)
        })
    })
}*/
static  addJobDetails(empNumber:any){ 
    cy.apis('PUT', `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees/${empNumber}/job-details`
        , EmployeeInit.initJobDetails())

}
static  addSalary(empNumber:any){ 
    cy.apis('POST', `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees/${empNumber}/salary-components`
        , EmployeeInit.initSalaryDetails())
 }
}

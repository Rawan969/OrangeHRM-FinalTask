import GenerateEmployee from "../pageObject/generateEmployee";
import DeleteDataInit from "../init/deleteDataInit";
const baseUrl = Cypress.config().baseUrl;
export const URLs = {
  addJob: `${baseUrl}/web/index.php/api/v2/admin/job-titles`,
  addLocation: `${baseUrl}/web/index.php/api/v2/admin/locations`,
  addNewEmployee: `${baseUrl}/web/index.php/api/v2/pim/employees`,
};
export let empId: number;
export let title: string;
export let jobId: number;
export let LocationId: number;
export let locationName: string;
let employees: [];

export default class Report {
  static addJob(info: any) {
    cy.apis("POST", URLs.addJob, info).then((response) => {
      jobId = response.data.id;
      title = response.data.title;
      console.log(jobId);
      console.log(title);
    });
  }
  static async addLocation(info: any) {
    cy.apis("POST", URLs.addLocation, info).then((response) => {
      LocationId = response.data.id;
      locationName = response.data.name;
    });
  }
  static async addNewEmployee() {
    employees = GenerateEmployee.generateEmp();
  }
  static deleteJob() {
    cy.apis("DELETE", URLs.addJob, DeleteDataInit.initDelete(jobId));
  }
  static deleteLocation() {
    cy.apis("DELETE", URLs.addLocation, DeleteDataInit.initDelete(LocationId));
  }
  static deleteEmployees() {
    employees.forEach((employeeId) => {
      cy.apis(
        "DELETE",
        URLs.addNewEmployee,
        DeleteDataInit.initDelete(employeeId)
      );
    });
  }
}

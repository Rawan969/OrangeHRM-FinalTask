import AddEmployee from "../../support/helpers/addEmployeeHelper";
import EmployeeInit from "../init/EmployeeInit";
import ClaimInit from "../init/submitClaimInit"
import DeleteDataInit from "../init/deleteDataInit";
const baseUrl = Cypress.config().baseUrl;
export const URLs = {
  addEvent: `${baseUrl}/web/index.php/api/v2/claim/events`,
  addExpense: `${baseUrl}/web/index.php/api/v2/claim/expenses/types`,
  addUser: `${baseUrl}/web/index.php/api/v2/admin/users`,
  addNewEmployee: `${baseUrl}/web/index.php/api/v2/pim/employees`,
  submitEvent :`${baseUrl}/web/index.php/api/v2/claim/requests`,
};
let empNumber: any;
export let eventId: number;
export let eventName: string;
export let expenseId: number;
export let expenseName: string;
export let SubmitEventId: number;
export let SubmitExpensetId:number;
export let SubmitActionId:number;

export default class Claim {
  static addEvent(info: any) {
    cy.apis("POST", URLs.addEvent, info).then((response) => {
      eventId = response.data.id;
      eventName = response.data.name;
      console.log(eventId);
      console.log(eventName);
    });
  }
  static addExpense(info: any) {
    cy.apis("POST", URLs.addExpense, info).then((response) => {
      expenseId = response.data.id;
      expenseName = response.data.name;
      console.log(expenseId);
      console.log(expenseName);
    });
  }
  static addUser() {
    return AddEmployee.addNewEmployee().then((resolve) => {
      empNumber = `${resolve}`;
      console.log(`user ${empNumber}`);
      cy.apis("POST", URLs.addUser, EmployeeInit.initUser(empNumber));
    });
  }
  static submitEvent(){
    cy.wait(5000);
    cy.apis("POST", URLs.submitEvent, ClaimInit.initEventClaim()).then((response) => {
      SubmitEventId = response.data.id;
      console.log(`submit event${SubmitEventId}`);
    }).then(()=>{
      this.submitExpense();
    })
  }
  
  static submitExpense(){
    cy.apis("POST",
    `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/claim/requests/${SubmitEventId}/expenses`
    ,ClaimInit.initExpenseClaim()).then((response) => {
      SubmitExpensetId = response.data.id;
      console.log(`submit expense${SubmitExpensetId}`);
    }).then(()=>{
      this.submitAction();
    })
  }
  static submitAction(){
    cy.apis("PUT", `/web/index.php/api/v2/claim/requests/${SubmitEventId}/action`,
     ClaimInit.initSubmitAction()).then((response) => {
      SubmitActionId = response.data.id;
      console.log(`submit action${SubmitActionId}`);
    })
  }
  static deleteEvent() {
    cy.apis("DELETE", URLs.addEvent, DeleteDataInit.initDelete(eventId));
  }
  static deleteExpense() {
    cy.apis("DELETE", URLs.addExpense, DeleteDataInit.initDelete(expenseId));
  }
  static deleteEmployee() {
    cy.apis("DELETE", URLs.addNewEmployee, DeleteDataInit.initDelete(empNumber));
  }
}

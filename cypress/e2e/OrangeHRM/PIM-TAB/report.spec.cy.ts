import LoginPage from "../../../support/pageObject/LoginPage";
import apisHelper from "../../../support/helpers/reportApisHelper";
import Report from "../../../support/pageObject/reportPage";
const loginObj: LoginPage = new LoginPage();
const reportObj: Report = new Report();

describe("Generate an Employee report with search by (Personal : First name/ Job: Job title/ Salary:Amount)", () => {
  beforeEach(() => {
    cy.visit("/web/index.php/auth/login");
    cy.fixture("LoginAdmin").as("user");
    cy.get("@user").then((userLogin: any) => {
      loginObj.userLogin(userLogin[0].username, userLogin[0].password);
    });
    //preRequisites
    cy.fixture("AddJob").as("job");
    cy.get("@job").then((info: any) => {
      apisHelper.addJob(info);
    });
    cy.fixture("AddLocation").as("Location");
    cy.get("@Location")
      .then((info: any) => {
        apisHelper.addLocation(info);
      })
      .then(() => {
        apisHelper.addNewEmployee();
      }); 
  });

  it("create 1 location , 1 job , 3 Employees and then generate a report", () => {
      reportObj.open()
      cy.fixture("CreateReport").as("create");
        cy.get("@create").then((data:any) => {
            reportObj.createReport(data);
        }).then(()=>{})
      reportObj.verifyReportName();
      cy.get("@create").then((data:any) => {
        reportObj.verifyHeaderNames(data);
       });
       reportObj.verifyRowNumber();
       reportObj.verifyRowValues();
       

  });

  afterEach(() => {
    apisHelper.deleteJob();
    apisHelper.deleteLocation();
    apisHelper.deleteEmployees();
  });
});

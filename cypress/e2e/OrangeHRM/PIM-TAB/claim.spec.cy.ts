import LoginPage from "../../../support/pageObject/LoginPage";
import ClaimHelper from "../../../support/helpers/claimHelper";
import Claim from "../../../support/pageObject/claimPage";
import { username, password } from "../../../support/init/EmployeeInit";
import {amount,date} from "../../../support/init/submitClaimInit";
const ClaimObj: Claim = new Claim();
const loginObj: LoginPage = new LoginPage();
const dataToAssert1 = [{ key: "Status", value:"Paid" },{ key: "Amount", value:`${amount}` },{ key: "Submitted Date",  value:`${date}` } ];
const dataToAssert2 = [{ key: "Status", value:"Rejected" },{ key: "Amount",  value:`${amount}` },{ key: "Submitted Date",  value:`${date}` } ];

describe("Claims Request Approval and Rejection flow", () => {

  beforeEach(() => {
    cy.visit("/web/index.php/auth/login");
    cy.fixture("LoginAdmin").as("user");
    cy.get("@user").then((userLogin: any) => {
      loginObj.userLogin(userLogin[0].username, userLogin[0].password);
    });
    cy.fixture("AddEvent").as("event");
    cy.get("@event").then((info: any) => {
      ClaimHelper.addEvent(info);
    });
    cy.fixture("AddExpense").as("expense");
    cy.get("@expense").then((info: any) => {
      ClaimHelper.addExpense(info);
    });
    ClaimHelper.addUser().then(()=>{
      loginObj.logout();
      loginObj.userLogin( username, password )
    }).then(()=>{
      ClaimHelper.submitEvent();
    }).then(()=>{
      loginObj.logout();
      cy.get("@user").then((userLogin: any) => {
        loginObj.userLogin(userLogin[0].username, userLogin[0].password);
      });
    })
  });

  ///////////First testCase
  it("Claims Request Approval", () => {
    ClaimObj.approveClaim().then(()=>{
      ClaimObj.assertionFun(dataToAssert1);
    })
  });

  /////////second testCase
  it("Claims Request Rejection", () => {
    ClaimObj.rejectClaim().then(()=>{
      ClaimObj.assertionFun(dataToAssert2);
    })
  });

  afterEach(() => {
    ClaimHelper.deleteEvent();
    ClaimHelper.deleteExpense();
    ClaimHelper.deleteEmployee();
  });
});

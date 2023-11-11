import {SubmitEventId} from "../helpers/claimHelper";
type keyVal = {
    key: string;
    value: string;
  };
export default class Claim{
    elements ={
        Btn:() => cy.get('[type="button"]'),
        mainTable: () => cy.get(".oxd-table"),
        tableBody: () => cy.get(".oxd-table-body"),
        tableHeader: () =>cy.get(".oxd-table-header-cell.oxd-padding-cell.oxd-table-th"),
    }
    approveClaim(){
       return cy.visit(`https://opensource-demo.orangehrmlive.com/web/index.php/claim/assignClaim/id/${SubmitEventId}`)
        .then(()=>{
            this.elements.Btn().contains(" Approve ").click();
        }).then(()=>{
            cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/claim/viewAssignClaim')
        })
    }
    rejectClaim(){
       return cy.visit(`https://opensource-demo.orangehrmlive.com/web/index.php/claim/assignClaim/id/${SubmitEventId}`)
        .then(()=>{
            this.elements.Btn().contains(" Reject ").click();
        }).then(()=>{
            cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/claim/viewAssignClaim')
        })
    }
    assertionFun(arr: keyVal[]) {
        let columnCount: any;
        let rowCount: any;
        let rowMatchesData = true;
        this.elements
          .mainTable()
          .find(".oxd-table-header-cell.oxd-padding-cell.oxd-table-th")
          .its("length")
          .then((count) => {
            columnCount = count;
          });
        this.elements
          .tableBody()
          .find(".oxd-table-card")
          .its("length")
          .then((count) => {
            rowCount = count;
          });
        for (let i = 0; i < arr.length; i++) {
          this.elements.mainTable().within(() => {
            const columnName = arr[i].key;
            let indexnum: any;
            let save: any;
            this.elements.tableHeader().each((th, mindex) => {
              cy.wrap(th)
                .invoke("text")
                .then((text: any) => {
                  indexnum = text.indexOf("AscendingDescending");
                  if (indexnum != -1) {
                    text = text.slice(0, indexnum);
                  }
                  if (text === columnName) {
                    this.elements
                      .tableBody()
                      .find(".oxd-table-card")
                      .each((th, index: any) => {
                        cy.wrap(th).then(() => {
                          if (rowMatchesData == true) {
                            cy.get(`.oxd-table-card:eq(${index})`)
                              .find(
                                `.oxd-table-cell.oxd-padding-cell > div:eq(${mindex})`
                              )
                              .each((th) => {
                                cy.wrap(th)
                                  .invoke("text")
                                  .then((text: any) => {
                                    if (text == arr[i].value) {
                                      save = index;
                                      cy.get(`.oxd-table-card:eq(${index})`)
                                        .find(
                                          `.oxd-table-cell.oxd-padding-cell > div:eq(${mindex})`
                                        )
                                        .should("have.text", arr[i].value);
                                      rowMatchesData = false;
                                    }
                                  });
                              });
                          }
                        });
                      });
                  }
                });
            });
          });
        }
      }
}
import { firstName,salaryAmount} from './../init/EmployeeInit';
import GenericHelper from "../helpers/genericFunctions"
import {locationName,title} from "../helpers/reportApisHelper"

const reportName = `report${ GenericHelper.genericRandomString()}`
export default class Report{
    elements = {
        ReportInput: () => cy.get('[placeholder="Type here ..."]'),
        SelectionCriteria:()=>cy.get('.oxd-select-text-input'),
        SelectionCriteriaOptions :()=>cy.get('.oxd-select-dropdown.--positon-bottom'),
        AddBtn:()=>cy.get('.oxd-icon.bi-plus'),
        includeHeader:()=>cy.get('.--label-right'),
        SaveBtn:()=>cy.get('[type="submit"]'),
        TableName:()=>cy.get('.oxd-text.oxd-text--h6.orangehrm-main-title'),
        TableHeader:(i:any)=>cy.get(`.header-content:eq(${i})`),
        TableRow:()=>cy.get('.rgRow'),

    }
    open(){
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/pim/definePredefinedReport')
    }
     createReport(data:any){
        this.elements.ReportInput().type(reportName);
        //add selection criteria (job)
        this.elements.SelectionCriteria().eq(0).click().invoke('scroll');
        this.elements.SelectionCriteriaOptions().contains(data.selection2).click();
        this.elements.AddBtn().eq(0).click();
        this.elements.SelectionCriteria().eq(2).click().invoke('scroll');
        this.elements.SelectionCriteriaOptions().contains(title).click();
        //add selection criteria (Location)
        this.elements.SelectionCriteria().eq(0).click().invoke('scroll');
        this.elements.SelectionCriteriaOptions().contains(data.selection1).click();
        this.elements.AddBtn().eq(0).click();
        this.elements.SelectionCriteria().eq(3).click().invoke('scroll');
        this.elements.SelectionCriteriaOptions().contains(locationName).click();
        //select display field group-personal
        this.elements.SelectionCriteria().eq(4).click().invoke('scroll');
        this.elements.SelectionCriteriaOptions().contains(data.displayTitle1).click();
        this.elements.SelectionCriteria().eq(5).click().invoke('scroll');
        this.elements.SelectionCriteriaOptions().contains(data.displayField1).click();
        this.elements.AddBtn().eq(1).click();
        this.elements.includeHeader().click();
        //select display field group-job
        this.elements.SelectionCriteria().eq(4).click().invoke('scroll');
        this.elements.SelectionCriteriaOptions().contains(data.displayTitle2).click();
        this.elements.SelectionCriteria().eq(5).click().invoke('scroll');
        this.elements.SelectionCriteriaOptions().contains(data.displayField2).click();
        this.elements.AddBtn().eq(1).click();
        this.elements.includeHeader().eq(1).click();
        //select display field group-salary
        this.elements.SelectionCriteria().eq(4).click().invoke('scroll');
        this.elements.SelectionCriteriaOptions().contains(data.displayTitle3).click();
        this.elements.SelectionCriteria().eq(5).click().invoke('scroll');
        this.elements.SelectionCriteriaOptions().contains(data.displayField3).click();
        this.elements.AddBtn().eq(1).click();
        this.elements.includeHeader().eq(2).click();

        this.elements.SaveBtn().click();
    }
    verifyReportName(){
        cy.wait(7000);
        this.elements.TableName().should('contain',reportName);
    }
    verifyHeaderNames(data:any){
        this.elements.TableHeader(0).should('contain',data.displayTitle1);
        this.elements.TableHeader(1).should('contain',data.displayTitle2);
        this.elements.TableHeader(2).should('contain',data.displayTitle3);
    }
    verifyRowNumber(){
        cy.get('.inner-content-table').find(".rgRow").then((row)=>{
            cy.get('.rgRow').should('have.length',3)
        });
    }
     verifyRowValues() {
        cy.fixture('CreateReport').as('create')
        cy.get('@create').then((info: any) => {
            const dataToAssert = [{ key: info.displayField1, value:firstName }, { key: info.displayField2, value: title}, { key: info.displayField3, value: salaryAmount}];
            for (let i = 0; i < dataToAssert.length; i++) {
                const columnName = dataToAssert[i].key;
                cy.get('.header-rgRow.actual-rgRow').find(".rgHeaderCell").each((th, index) => {
                    cy.wrap(th).invoke('text').then((text: any) => {
                        if (text === columnName) {
                            cy.get('.vertical-inner').find(".rgRow").each((tr) => {
                                cy.wrap(tr).within(() => {
                                    cy.get(`.rgCell:eq(${index})`).invoke('text').then((cellText: any) => {
                                        if (cellText === dataToAssert[i].value) {
                                            cy.get(`.rgCell:eq(${index})`).should('have.text', dataToAssert[i].value);
                                        } else
                                            cy.get(`.rgCell:eq(${index})`).should('contain', dataToAssert[i].value);
                                    });
                                });
                            });
                        }
                    });
                });
            }
        })
    }
}
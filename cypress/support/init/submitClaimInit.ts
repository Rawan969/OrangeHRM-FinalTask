import {submitExpensePayload} from "../API/payload/submitExpensePayload"
import {submitEventPayload} from "../API/payload/submitEventPayload";
import {eventId,expenseId} from "../helpers/claimHelper";
import {submitActionPayload} from "../API/payload/submitActionPayload";
export let amount : string ="5.00";
export let date : string ="2023-11-18";
export default class Claim{
    static initEventClaim(): submitEventPayload {
        return {
            claimEventId:eventId,
            currencyId:"CAD",
            remarks:null
        };
      }
      static initExpenseClaim(): submitExpensePayload {
        return {
            amount:amount,
            date:date,
            expenseTypeId:expenseId,
            note:null
        };
      }
      static initSubmitAction(): submitActionPayload {
        return {
            action:"SUBMIT"
        };
      }
} 

import { IDeletePayload } from "../../support/API/payload/deletePayload"
export default class DeleteDataInit {
    static initDelete(id: any): IDeletePayload {
        let deletePayload: IDeletePayload = {
            ids: [id],
        }
        return deletePayload
    }
}
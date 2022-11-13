import {SPREADSHEET_ID} from '../conf'

export default class Initiator{
    spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet | null | undefined;
    usersSheet: GoogleAppsScript.Spreadsheet.Sheet | null | undefined;

    /**
     * Inits the spreadsheet in the class
     * @returns {Initiator}
     */
    initSpreadsheet(): Initiator | void{
        if(this.spreadsheet !== null && this.spreadsheet !== undefined) return
        this.spreadsheet = SpreadsheetApp.openById("1jZqnrL40aVJDCh6zEOru_E18iTQA0havQnnxapUYR30")
        if(typeof this.spreadsheet === null) throw new Error("Spreadsheet not found")
        return this
    }

    /**
     * Inits the users sheet in the class
     * @returns {Initiator}
     */
    initUsersSheet(): Initiator | void{
        if(this.spreadsheet === null || this.spreadsheet === undefined) this.initSpreadsheet()
        if(this.usersSheet !== null && this.usersSheet !== undefined) return
        this.usersSheet = this.spreadsheet?.getSheetByName("Users")
        if(typeof this.usersSheet === null) throw new Error("Users sheet not found")
        return this
    }
}

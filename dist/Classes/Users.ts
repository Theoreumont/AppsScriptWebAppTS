import { UserInterface } from './../Interfaces/UserInterface';
import Initiator from './Initiator';

export default class Users{
    sheet: GoogleAppsScript.Spreadsheet.Sheet | null | undefined;

    constructor(){
        const init = new Initiator()
        init.initUsersSheet()
        this.sheet = init.usersSheet
    }

    getAllData(){
        const data: any[][] = this.sheet?.getDataRange().getValues() || []
        if(data.length === 0) throw new Error("No data found")
        return Users.formatData(data)
    }

    static formatData(data: any[][]): UserInterface[]{
        let formattedData: UserInterface[] = []
        let headers: string[] = data[0]
        for(let i = 1; i < data.length; i++){
            let obj: UserInterface = {} as UserInterface
            for(let j = 0; j < data[i].length; j++){
                if(headers[j] === "Birth Year"){
                    obj[headers[j]] = data[i][j].toLocaleDateString('fr-FR') as Date
                }else if(headers[j] === "Skills"){
                    // Only unique
                    obj[headers[j]] = Array.from(new Set(data[i][j].split(",").map((skill: string) => skill.trim())))
                }
                else{
                    obj[headers[j]] = data[i][j]
                }
            }
            formattedData.push(obj)
        }
        return formattedData
    }
}
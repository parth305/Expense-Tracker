import { ReportType, mydata } from "./mydata";
import { v4 as uuid } from "uuid";

interface Report {
  amount: number,
  source: string,
}
export class AppService {

  getAllReports(type: ReportType) {
    if (type === ReportType.INCOME) {
      return mydata.report.filter(element => element.type == ReportType.INCOME)
    }
    if (type === ReportType.EXPENSE) {
      return mydata.report.filter(element => element.type == ReportType.EXPENSE)
    }
  }

  getReportById(type: ReportType, id: string) {
    return mydata.report.filter(element => {
      if (type == element.type && element.id == id) {
        return element
      }
    })
  }

  createReport(type: ReportType, { amount, source }: Report) {
    const newReport = {
      amount,
      source,
      id: uuid(),
      type,
      created_at: new Date(),
      updated_at: new Date()
    }

    mydata.report.push(newReport)

    return newReport
  }

  updateReport(type:ReportType,id:string,body:Report){
    let data = mydata.report.find(element => element.id == id);

    if (!data || data.type !== type) {
      return "No Data Found"
    }

    data = { ...data, ...body, updated_at: new Date() }

    for (let i = 0; i < mydata.report.length; i++) {
      if (mydata.report[i].id === id) {
        mydata.report[i] = data
        break;
      }
    }

    return mydata
  }

  deleteReport(id:string){
    const index = mydata.report.findIndex(element => element.id === id);

    if (index === -1)
      return "Not Found";

    mydata.report.splice(index, 1);
  }
}
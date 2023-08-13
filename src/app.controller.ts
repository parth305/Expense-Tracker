import { Controller, Delete, Get, Param, Post, Put, Body } from "@nestjs/common/decorators";
import { DataInterface, ReportType, mydata } from "./mydata";
import { ReportDto } from "./report.dto";
import {v4 as uuid} from "uuid";
@Controller("report/:type")
export class AppController {

  @Get()
  getAllIncome(@Param("type") type: "income" | "expense") {
    if (type === ReportType.INCOME) {
      return mydata.report.filter(element => element.type == ReportType.INCOME)
    }
    if (type === ReportType.EXPENSE) {
      return mydata.report.filter(element => element.type == ReportType.EXPENSE)
    }
  }

  @Get(":id")
  getReportById(@Param("type") type: ReportType.EXPENSE | ReportType.INCOME, @Param("id") id: string) {
    if (type === ReportType.INCOME || type === ReportType.EXPENSE) {
      return mydata.report.filter(element => {
        if (type == element.type && element.id == id) {
          return element
        }
      })
    }
  }

  @Post()
  createReport(@Body() body: ReportDto,@Param("type") type:ReportType.INCOME | ReportType.EXPENSE) {
    const reportType=type=="income"?ReportType.INCOME:ReportType.EXPENSE;

    const newReport={
      amount:body.amount,
      source:body.source,
      id:uuid(),
      type: reportType,
      created_at:new Date(),
      updated_at:new Date()
    }

    mydata.report.push(newReport)
    
    return newReport
  }

  @Put(":id")
  updateReport() {
    return "updated"
  }

  @Delete(":id")
  deleteReport() {
    return "deleted"
  }
}
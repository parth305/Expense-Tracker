import { Controller, Delete, Get, Param, Post, Put, Body, HttpCode } from "@nestjs/common/decorators";
import { ReportType, mydata } from "./mydata";
import { ReportDto, updateReportDTO } from "./report.dto";
import { AppService } from "./app.service";
@Controller("report/:type")
export class AppController {

  constructor(private readonly appService: AppService) {

  }
  @Get()
  getAllReports(@Param("type") type: "income" | "expense") {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReports(reportType)
  }

  @Get(":id")
  getReportById(@Param("type") type: ReportType.EXPENSE | ReportType.INCOME, @Param("id") id: string) {
    if (type === ReportType.INCOME || type === ReportType.EXPENSE) {
      return this.appService.getReportById(type, id)
    }
  }

  @Post()
  createReport(@Body() body: ReportDto, @Param("type") type: ReportType.INCOME | ReportType.EXPENSE) {
    const reportType = type == "income" ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.createReport(reportType,{amount:body.amount,source:body.source})
  }

  @Put(":id")
  updateReport(@Param("id") id: string, @Body() body: updateReportDTO, @Param("type") type: ReportType.INCOME | ReportType.EXPENSE) {
    const reportType=type==="income"?ReportType.INCOME:ReportType.EXPENSE
    return this.appService.updateReport(type,id,body)
  }

  @HttpCode(204)
  @Delete(":id")
  deleteReport(@Param("id") id: string) {
    return this.appService.deleteReport(id);
  }
}
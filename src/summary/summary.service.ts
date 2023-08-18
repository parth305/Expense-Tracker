import { Injectable } from '@nestjs/common';
import { ReportType } from 'src/mydata';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
  constructor(private readonly reportService: ReportService) {}
  calculateSumarry() {
    const totalExpense = this.reportService
      .getAllReports(ReportType.EXPENSE)
      .reduce((total, report) => total + report.amount, 0);

    const totalIncome = this.reportService
      .getAllReports(ReportType.INCOME)
      .reduce((total, report) => total + report.amount, 0);

      return {
        totalExpense,totalIncome,netTotal:totalExpense-totalIncome
      }
  }
}

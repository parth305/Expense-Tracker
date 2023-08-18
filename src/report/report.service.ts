import { ReportType, mydata } from '../mydata';
import { v4 as uuid } from 'uuid';
import { ResponseReportDTO } from './report.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
interface Report {
  amount: number;
  source: string;
}

interface UpdateReport {
  amount?: number;
  source?: string;
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ResponseReportDTO[] {
    return mydata.report
      .filter((element) => element.type === type)
      .map((report) => new ResponseReportDTO(report));
  }

  getReportById(type: ReportType, id: string): ResponseReportDTO {
    const report=mydata.report.find((element) => {
      if (type == element.type && element.id === id) {
        return element;
      }
    });
    if(!report) return;
    return new ResponseReportDTO(report)
  }

  createReport(
    type: ReportType,
    { amount, source }: Report,
  ): ResponseReportDTO {
    const newReport = {
      amount,
      source,
      id: uuid(),
      type,
      created_at: new Date(),
      updated_at: new Date(),
    };

    mydata.report.push(newReport);

    return new ResponseReportDTO(newReport);
  }

  updateReport(
    type: ReportType,
    id: string,
    body: UpdateReport,
  ): ResponseReportDTO {
    let data = mydata.report.find((element) => element.id == id);

    if (!data || data.type !== type) return;

    data = { ...data, ...body, updated_at: new Date() };

    for (let i = 0; i < mydata.report.length; i++) {
      if (mydata.report[i].id === id) {
        mydata.report[i] = data;
        break;
      }
    }

    return new ResponseReportDTO(data);
  }

  deleteReport(id: string) {
    const index = mydata.report.findIndex((element) => element.id === id);

    if (index === -1) return 'Not Found';

    mydata.report.splice(index, 1);
  }
}

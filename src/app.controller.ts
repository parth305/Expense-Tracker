import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  HttpCode,
} from '@nestjs/common/decorators';
import { ReportType, mydata } from './mydata';
import { ReportDto, updateReportDTO } from './report.dto';
import { AppService } from './app.service';
import { ParseEnumPipe, ParseUUIDPipe } from '@nestjs/common';
@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ) {
    return this.appService.getAllReports(type);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.appService.getReportById(type, id);
  }

  @Post()
  createReport(
    @Body() body: ReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ) {
    return this.appService.createReport(type, {
      amount: body.amount,
      source: body.source,
    });
  }

  @Put(':id')
  updateReport(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: updateReportDTO,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ) {
    return this.appService.updateReport(type, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.deleteReport(id);
  }
}

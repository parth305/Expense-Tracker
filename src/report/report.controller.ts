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
  import { ReportType } from '../mydata';
  import { ReportDto, ResponseReportDTO, updateReportDTO } from './report.dto';
  import { ReportService } from './report.service';
  import { ParseEnumPipe, ParseUUIDPipe } from '@nestjs/common';
  @Controller('report/:type')
  export class ReportController {
    constructor(private readonly reportService: ReportService) {}
    @Get()
    getAllReports(
      @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    ):ResponseReportDTO[] {
      console.log("in");
      
      return this.reportService.getAllReports(type);
    }
  
    @Get(':id')
    getReportById(
      @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
      @Param('id', ParseUUIDPipe) id: string,
    ):ResponseReportDTO {
      return this.reportService.getReportById(type, id);
    }
  
    @Post()
    createReport(
      @Body() body: ReportDto,
      @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    ) {
      return this.reportService.createReport(type, {
        amount: body.amount,
        source: body.source,
      });
    }
  
    @Put(':id')
    updateReport(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() body: updateReportDTO,
      @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    ):ResponseReportDTO {
      return this.reportService.updateReport(type, id, body);
    }
  
    @HttpCode(204)
    @Delete(':id')
    deleteReport(@Param('id', ParseUUIDPipe) id: string) {
       this.reportService.deleteReport(id);
    }
  }
  
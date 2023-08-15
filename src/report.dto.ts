import { IsInt, IsString, IsOptional } from 'class-validator';

export class ReportDto {
  @IsInt()
  amount: number;

  @IsString()
  source: string;
}

export class updateReportDTO {
  @IsOptional()
  amount: number;

  @IsOptional()
  source: string;
}

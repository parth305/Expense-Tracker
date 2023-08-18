import {
  IsInt,
  IsString,
  IsOptional,
  IsPositive,
  IsNotEmpty,
} from 'class-validator';
import { ReportType } from '../mydata';
import { Exclude, Expose } from 'class-transformer';

export class ReportDto {
  @IsInt()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}

export class updateReportDTO {
  @IsOptional()
  @IsInt()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  source: string;
}

export class ResponseReportDTO {
  id: string;
  amount: number;
  source: string;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
  type: ReportType;

  constructor(partial:Partial<ResponseReportDTO>){
    Object.assign(this,partial)
  }

  @Expose({name:"createdAt"})
  transformCreatedAt(){
    return this.created_at;
  }
}

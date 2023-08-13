import { IsInt ,IsString, IsIn} from "class-validator";

export class ReportDto{
    @IsInt()
    amount:number;

    @IsString()
    source:string;

}
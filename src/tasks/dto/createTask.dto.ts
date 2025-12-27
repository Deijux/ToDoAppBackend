import { IsString, MinLength, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  description?: string;
}

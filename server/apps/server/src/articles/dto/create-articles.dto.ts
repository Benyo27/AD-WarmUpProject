import { IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  author: string;

  @IsString()
  created_at: string;

  @IsString()
  created_at_formated: string;

  @IsString()
  title: string;

  @IsString()
  url: string;
}

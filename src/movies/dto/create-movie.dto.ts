import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateMovieDTO {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsString()
  readonly genres: string[];
}

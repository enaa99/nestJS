import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { MovieGenres } from '../entity/movie-genres.entity';

export class CreateMovieDTO {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString({ each: true })
  readonly genres: MovieGenres[];
}

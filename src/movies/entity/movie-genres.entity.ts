import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movie } from './Movie.entity';

@Entity()
export class MovieGenres {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  genre: string;

  @OneToMany(() => Movie, (movie) => movie.genres)
  movie: Movie;
}

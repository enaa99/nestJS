import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MovieGenres } from './movie-genres.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  title: string;

  @Column()
  year: number;

  @OneToMany(() => MovieGenres, (target) => target.movie, {
    cascade: ['insert', 'update'],
  })
  genres: MovieGenres[];
}

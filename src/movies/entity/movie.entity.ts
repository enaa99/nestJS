import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  title: string;

  @Column()
  year: number;

  @Column()
  genres: string;
}

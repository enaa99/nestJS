import { Controller, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entity/Movie.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MoviesService],
  controllers: [MoviesController],
  exports: [MoviesService],
})
export class MoviesModule {}

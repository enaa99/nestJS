import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entity/Movie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieGenres } from './entity/movie-genres.entity';
@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }

  async create(movieData: CreateMovieDTO) {
    // this.movies.push({
    //   id: this.movies.length + 1,
    //   ...movieData,
    // });
    const movie = new Movie();
    movie.title = movieData.title;
    movie.year = movieData.year;
    movie.genres = [];

    movieData.genres.map((genreDto) => {
      console.log(genreDto + '여기이거');
      const genre = new MovieGenres();
      genre.genre = genreDto;
      genre.movie = movie;

      movie.genres.push(genre);
    });

    await this.movieRepository.save(movie);
  }

  update(id: number, updateData: UpdateMovieDTO) {
    // const movie = this.getOne(id);
    // this.deleteOne(id);
    // this.movies.push({ ...movie, ...updateData });
  }
}

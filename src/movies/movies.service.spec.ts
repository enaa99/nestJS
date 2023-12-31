import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { MovieGenres } from './entity/movie-genres.entity';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    const genres = [];

    const genre1 = new MovieGenres();
    genre1.genre = 'horror';
    genres.push(genre1);

    const genre2 = new MovieGenres();
    genre2.genre = 'romance';
    genres.push(genre2);

    service.create({
      title: 'Test Movie',
      genres: genres,
      year: 2000,
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found');
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      const beforeDelete = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();

      expect(afterDelete.length).toEqual(beforeDelete.length - 1);
    });
    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      const tests = [];
      const gen = new MovieGenres();
      gen.genre = 'sexy';
      tests.push(gen);
      service.create({
        title: 'Test Movie2',
        genres: tests,
        year: 2002,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      const dto = new UpdateMovieDTO();
      dto.title = 'Updated Test';
      service.update(1, dto);
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });
  });
});

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('search')
  search(@Query('year') searchingYaer: string) {
    return `We are Searching for a movie with a title ${searchingYaer}`;
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `This will return one movie: ${id}`;
  }

  @Post()
  create(@Body() moviedata) {
    console.log(moviedata);
    return moviedata;
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `This will delete a movie ${movieId}`;
  }

  @Put('/:id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }
}

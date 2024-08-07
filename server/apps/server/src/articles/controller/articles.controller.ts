import { Controller, Get, Param, Delete } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('fetch')
  fetchAndSaveArticles() {
    return this.articlesService.fetchAndSaveArticles();
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}

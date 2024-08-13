import { ArticlesRepository } from '../repository/articles.repository';
import { HttpService } from '@nestjs/axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { formatDate } from '../utils/formatDate';
import { isNotValidOrAlreadyExists } from '../utils/isNotValidOrAlreadyExists';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly httpService: HttpService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async fetchAndSaveArticles() {
    await this.articlesRepository.deleteMany();

    const response = await this.httpService.axiosRef.get(
      process.env.ARTICLES_API_URL,
    );
    const articles = response.data.hits;

    for (const article of articles) {
      const existingArticle = await this.articlesRepository.findOne(
        article.title || article.story_title,
      );
      if (isNotValidOrAlreadyExists(article, existingArticle)) {
        continue;
      }
      const created_at_formated = formatDate(article.created_at);
      this.articlesRepository.create({
        author: article.author,
        created_at: article.created_at,
        created_at_formated,
        title: article.title || article.story_title,
        url: article.url || article.story_url,
      });
    }
  }

  findAll() {
    return this.articlesRepository.findAll();
  }

  remove(_id: string) {
    return this.articlesRepository.remove(_id);
  }
}

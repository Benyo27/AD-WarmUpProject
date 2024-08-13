import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticlesProvider {
  constructor(private readonly httpService: HttpService) {}

  async fetchArticles() {
    const response = await this.httpService.axiosRef.get(
      process.env.ARTICLES_API_URL,
    );
    return response.data.hits;
  }
}

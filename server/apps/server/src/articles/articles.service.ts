import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from './schema/articles.schema';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    private readonly httpService: HttpService,
  ) {}

  async fetchAndSaveArticles() {
    const response = await this.httpService.axiosRef.get(
      'https://hn.algolia.com/api/v1/search_by_date?query=nodejs',
    );
    const articles = response.data.hits;

    for (const article of articles) {
      const existingArticle = await this.articleModel.findOne({
        title: article.title || article.story_title,
      });
      if (
        !article.author ||
        !article.created_at ||
        (!article.title && !article.story_title) ||
        (!article.url && !article.story_url) ||
        existingArticle
      ) {
        continue;
      }
      const createdArticle = new this.articleModel({
        author: article.author,
        created_at: new Date(article.created_at),
        title: article.title || article.story_title,
        url: article.url || article.story_url,
      });

      await createdArticle.save();
    }
  }

  findAll() {
    return this.articleModel.find();
  }

  remove(title: string) {
    return this.articleModel.deleteOne({ title });
  }
}

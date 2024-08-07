import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from './schema/articles.schema';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { UTCDate } from '@date-fns/utc';
import { parseISO, format, differenceInDays } from 'date-fns';
import { Cron, CronExpression } from '@nestjs/schedule';

const formatDate = (created_at: string) => {
  const parsedDate = parseISO(created_at);
  const now = new Date();

  const daysDifference = differenceInDays(now, parsedDate);
  if (daysDifference < 1) {
    return format(new UTCDate(created_at), 'hh:mm aaa');
  } else if (daysDifference === 1) {
    return 'Yesterday';
  } else {
    return format(created_at, 'MMM d');
  }
};

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    private readonly httpService: HttpService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async fetchAndSaveArticles() {
    await this.articleModel.deleteMany({});

    const response = await this.httpService.axiosRef.get(
      process.env.ARTICLES_API_URL,
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
      const created_at_formated = formatDate(article.created_at);
      const createdArticle = new this.articleModel({
        author: article.author,
        created_at: new Date(article.created_at),
        created_at_formated,
        title: article.title || article.story_title,
        url: article.url || article.story_url,
      });

      await createdArticle.save();
    }
  }

  findAll() {
    return this.articleModel.find().sort({ created_at: -1 });
  }

  remove(_id: string) {
    return this.articleModel.deleteOne({ _id });
  }
}

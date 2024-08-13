import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from '../schema/articles.schema';
import { Model } from 'mongoose';
import { CreateArticleDto } from '../dto/create-articles.dto';

@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async deleteMany() {
    return this.articleModel.deleteMany({});
  }

  async create(createArticleDto: CreateArticleDto) {
    const exists = await this.findOne(createArticleDto.title);
    if (!exists) {
      const createdArticle = new this.articleModel(createArticleDto);
      return createdArticle.save();
    }
  }

  async findOne(title: string) {
    return this.articleModel.findOne({ title });
  }

  async findAll() {
    return this.articleModel.find().sort({ created_at: -1 });
  }

  async remove(_id: string) {
    return this.articleModel.deleteOne({ _id });
  }
}

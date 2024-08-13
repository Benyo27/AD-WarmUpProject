import { Module } from '@nestjs/common';
import { ArticlesService } from './service/articles.service';
import { ArticlesController } from './controller/articles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './schema/articles.schema';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ArticlesProvider } from './provider/articles.provider';
import { ArticlesRepository } from './repository/articles.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    HttpModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesProvider, ArticlesRepository],
})
export class ArticlesModule {}

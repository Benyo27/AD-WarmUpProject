import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { Article, ArticleSchema } from '../schema/articles.schema';
import { getModelToken } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ArticlesRepository } from '../repository/articles.repository';
import { ArticlesProvider } from '../provider/articles.provider';

describe('ArticlesService', () => {
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let articleModel: Model<Article>;

  let service: ArticlesService;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    articleModel = mongoConnection.model(Article.name, ArticleSchema);

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [
        ArticlesService,
        ArticlesRepository,
        ArticlesProvider,
        {
          provide: getModelToken(Article.name),
          useValue: articleModel,
        },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  describe('Article Service Test', () => {
    it('should fetch and save articles', async () => {
      await service.fetchAndSaveArticles();
      const articles = await articleModel.find();
      expect(articles.length).toBeGreaterThan(0);
    });

    it('should return all articles', async () => {
      const articles = await service.findAll();
      expect(articles.length).toBeGreaterThan(0);
    });

    it('should delete a certain article', async () => {
      const article = await articleModel.findOne();
      const initialArticlesCount = await articleModel.countDocuments();
      await service.remove(article._id.toString());
      const finalArticlesCount = await articleModel.countDocuments();
      expect(finalArticlesCount).toBeLessThan(initialArticlesCount);
    });
  });
});

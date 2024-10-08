import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  created_at: string;

  @Prop({ required: true })
  created_at_formated: string;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  url: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

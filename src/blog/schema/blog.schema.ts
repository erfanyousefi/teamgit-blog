import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema({timestamps: true})
export class Blog {
  @Prop({required: true})
  title: string;
  @Prop({required: true})
  image: string;
  @Prop({required: true})
  content: string;
  @Prop({required: true})
  author: string;
  @Prop({required: true, type: Types.ObjectId})
  category: Types.ObjectId;
}
export type BlogDocument = Blog & Document;
export const BlogSchema = SchemaFactory.createForClass(Blog);
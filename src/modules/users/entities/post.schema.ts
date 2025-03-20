import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ required: true })
  postTitle: string;

  @Prop({ required: true })
  postContent: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  postOwnerID: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);

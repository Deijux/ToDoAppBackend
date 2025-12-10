import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type taskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: Boolean, default: false })
  completed: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

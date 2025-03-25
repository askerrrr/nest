import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ _id: false })
export class Admin {
  @Prop()
  login: string;
  @Prop()
  passwd: string;
}

export var AdminSchema = SchemaFactory.createForClass(Admin);

import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop()
  readonly login: string;

  @Prop()
  readonly passwd: string;
}

export var AdminSchema = SchemaFactory.createForClass(Admin);

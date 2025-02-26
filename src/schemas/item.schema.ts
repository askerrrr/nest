import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ItemStatusDocument = HydratedDocument<ItemStatus>;

class ItemStatus {}

export var ItemStatusSchema = SchemaFactory.createForClass(ItemStatus);

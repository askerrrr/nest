import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ItemStatusDocument = HydratedDocument<ItemStatus>;

@Schema({ _id: false })
class Order {
  @Prop()
  id: string;
  @Prop({ type: [String] })
  items: string[];
  @Prop({ type: [String] })
  itemId: string[];
}

@Schema()
class ItemStatus {
  @Prop()
  userId: string;

  @Prop({ type: [Order] })
  orders: Order[];
}

export var ItemStatusSchema = SchemaFactory.createForClass(ItemStatus);

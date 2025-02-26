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

@Schema({ _id: false })
class OrderWrapper {
  @Prop({ type: Order })
  order: Order;
}

@Schema()
export class ItemStatus {
  @Prop()
  userId: string;

  @Prop({ type: [OrderWrapper] })
  orders: OrderWrapper[];
}

export var ItemStatusSchema = SchemaFactory.createForClass(ItemStatus);

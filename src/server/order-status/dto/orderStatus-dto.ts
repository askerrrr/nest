export class OrderStatusDto {
  readonly orderStatus: string;
}
// | undefined
//   | null
//   | 'in-processing:1'
//   | 'purchased:2'
//   | 'china-warehouse:3'
//   | 'on-the-way:4'
//   | 'awaiting-receipt:5'
//   | 'order-is-completed:6';

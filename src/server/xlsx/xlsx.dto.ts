export class Params {
  readonly userId: string;
  readonly orderId: string;
}

export class FIleIsExists {
  readonly fileIsExists: boolean;
}

export class XlsxData {
  readonly url: string[];
  readonly qty: string[];
  readonly size: string[];
  readonly totalSum: string[];
  readonly itemPrice: string[];
}

export class CombinedData {
  readonly id: string;
  readonly url: string;
  readonly qty: string;
  readonly size?: string;
  readonly img: string;
  readonly item: string;
  readonly itemPrice: string;
  readonly totalSum?: string;
}

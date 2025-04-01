import { IsString } from 'class-validator';

export class XlsxData {
  @IsString({ each: true })
  readonly url: string[];

  @IsString({ each: true })
  readonly qty: string[];

  @IsString({ each: true })
  readonly size: string[];

  @IsString({ each: true })
  readonly totalSum: string[];

  @IsString({ each: true })
  readonly itemPrice: string[];
}

export class CombinedData {
  @IsString()
  readonly id: string;

  @IsString()
  readonly url: string;

  @IsString()
  readonly qty: string;

  @IsString()
  readonly size?: string;

  @IsString()
  readonly img: string;

  @IsString()
  readonly item: string;

  @IsString()
  readonly itemPrice: string;

  @IsString()
  readonly totalSum?: string;
}

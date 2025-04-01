import { IsBoolean } from 'class-validator';

export class FIleIsExists {
  @IsBoolean()
  readonly fileIsExists: boolean;
}

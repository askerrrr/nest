import { Injectable } from '@nestjs/common';
import { UserCollectionService } from 'src/database/user.collection.service';

@Injectable()
export class XlsxService {
  constructor(private userCollection: UserCollectionService) {}
  getXLSXFile(userId, orderId) {}

  getXLSXData(userId, orderId) {}
}

import { rm } from 'fs/promises';

export class UtilsForOrder {
  async deleteOrderFile(filePath): Promise<boolean> {
    try {
      await rm(filePath);
      return true;
    } catch (err) {
      if (err.code == 'ENOENT') {
        return false;
      } else {
        throw err;
      }
    }
  }

  async deleteUserFolder(userId): Promise<boolean> {
    try {
      await rm('/var/www/userFiles/' + userId, { recursive: true });
      return true;
    } catch (err) {
      if (err.code == 'ENOENT') {
        return false;
      } else {
        throw err;
      }
    }
  }

  async sendDeleteOrderRequest(userId, orderId) {
    var response = await fetch(`${process.env.bot_server_order}`, {
      method: 'DELETE',
      body: JSON.stringify({ userId, orderId }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.bot_secret_key}`,
      },
    });

    return response.status == 200;
  }

  async sendDeleteUserRequest(userId): Promise<boolean> {
    var response = await fetch(`${process.env.bot_server_user}`, {
      method: 'DELETE',
      body: JSON.stringify({ userId }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.bot_secret_key}`,
      },
    });

    return response.status == 200;
  }
}

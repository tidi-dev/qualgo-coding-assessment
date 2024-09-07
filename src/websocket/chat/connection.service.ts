import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class ConnectionService {
  private users = new Map<string, string>();

  handleConnection(client: Socket): void {
    client.emit('connected', { message: 'Welcome to the chat' });
  }

  handleDisconnect(client: Socket, server: Server): void {
    this.users.delete(client.id);
    server.emit('userDisconnected', { clientId: client.id });
  }

  addUser(clientId: string, username: string) {
    this.users.set(clientId, username);
    console.log(this.users.get(clientId));
  }

  removeUser(clientId: string) {
    this.users.delete(clientId);
  }

  getUsername(clientId: string): string | undefined {
    return this.users.get(clientId);
  }
}

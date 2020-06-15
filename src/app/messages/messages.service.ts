import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

export enum MessageType {
  MT_INFO,
  MT_SUCCESS,
  MT_WARNING,
  MT_ERROR
}

export class Message {
  constructor(public messageType: MessageType, public messageText: string, public dismissible: boolean, public messageSource?: string) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private lastMessage: Subject<Message> = new Subject<Message>();

  constructor() { }

  reportMessage(message: Message): void {
    this.lastMessage.next(message);
  }

  clearMessage(): void {
    this.lastMessage.next(null);
  }

  getLastMessage(): Observable<Message> {
    return this.lastMessage;
  }
}

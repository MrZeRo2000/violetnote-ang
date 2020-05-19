import {Component, Input, OnInit} from '@angular/core';
import {Message, MessagesService, MessageType} from '../messages.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  displayMessage: Message;
  MessageType = MessageType;

  @Input() messageSource: string;

  constructor(private messagesService: MessagesService) {
    messagesService.getLastMessage().subscribe(message => {
      if (
        (this.messageSource && message && message.messageSource && this.messageSource === message.messageSource) ||
        (!this.messageSource && message && !message.messageSource)
      ) {
        this.displayMessage = message;
      } else {
        this.displayMessage = null;
      }
    });
  }

  ngOnInit(): void {
  }

  onClosed(): void {
    this.displayMessage = null;
  }
}

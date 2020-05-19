import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MessagesService} from './messages.service';
import { MessageComponent } from './message/message.component';
import {AlertModule} from 'ngx-bootstrap/alert';


@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    CommonModule,
    AlertModule.forRoot()
  ],
  providers: [
    MessagesService
  ],
  exports: [
    MessageComponent
  ]
})
export class MessagesModule { }

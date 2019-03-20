import { Component, OnInit } from '@angular/core';

import { MessageModel } from '../_models/message.model';
import { IPagination, PaginatedResult } from '../_models/pagination';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messagesArr: MessageModel[];
  pagination: IPagination;
  messageContainer = 'Unread';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messagesArr = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.userService
      .getMessage(
        this.authService.decodedToken.nameid,
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.messageContainer
      )
      .subscribe(
        (res: PaginatedResult<MessageModel[]>) => {
          this.messagesArr = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alertifyService.error(error);
        }
      );
  }

  deleteMessage(id: number) {
    this.alertifyService.confirm(
      'Are you sure you want to delete this message?',
      () => {
        this.userService
          .deleteMessage(id, this.authService.decodedToken.nameid)
          .subscribe(
            () => {
              this.messagesArr.splice(
                this.messagesArr.findIndex(m => m.id === id),
                1
              );
              this.alertifyService.success('Message has been deleted.');
            },
            error => this.alertifyService.error('Failed to delete message')
          );
      }
    );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
}

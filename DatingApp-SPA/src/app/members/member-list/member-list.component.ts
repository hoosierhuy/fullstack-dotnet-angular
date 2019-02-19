import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserModel } from '../../_models/user.model';
import { IPagination, PaginatedResult } from '../../_models/pagination';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: UserModel[];
  pagination: IPagination;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers$(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((_result: PaginatedResult<UserModel[]>) => {
        this.users = _result.result;
        this.pagination = _result.pagination;
    }, err => this.alertifyService.error(err));
  }
}

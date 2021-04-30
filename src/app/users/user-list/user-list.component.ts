/*
 *
 *  * Copyright 2016-2017 the original author or authors.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

/**
 * @author Vitaliy Fedoriv
 */

import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  errorMessage: string;
  users: User[];

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      users => this.users = users,
      error => this.errorMessage = error as any);
  }

  onSelect(user: User) {
    this.router.navigate(['/users', user.id]);
  }

  addUser() {
    this.router.navigate(['/users/add']);
  }

}

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
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;
  errorMessage: string; // server error message

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.user = {} as User;
  }

  ngOnInit() {
    const userId = this.route.snapshot.params.id;
    this.userService.getUserById(userId).subscribe(
      user => this.user = user,
      error => this.errorMessage = error as any);
  }

  onSubmit(user: User) {
    const that = this;
    this.userService.updateUser(user.id.toString(), user).subscribe(
      res => this.gotoUserDetail(user),
      error => this.errorMessage = error as any
    );
  }

  gotoUserDetail(user: User) {
    this.errorMessage = null;
    this.router.navigate(['/users', user.id]);
  }

}

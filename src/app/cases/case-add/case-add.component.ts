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


import {Component, Input, OnInit} from '@angular/core';
import {Case} from '../case';
import {Status} from '../../statuses/status';
import {User} from '../../users/user';
import {ActivatedRoute, Router} from '@angular/router';
import {StatusService} from '../../statuses/status.service';
import {CaseService} from '../case.service';
import {UserService} from '../../users/user.service';

import * as moment from 'moment';

@Component({
  selector: 'app-case-add',
  templateUrl: './case-add.component.html',
  styleUrls: ['./case-add.component.css']
})
export class CaseAddComponent implements OnInit {
  aCase: Case;
  @Input() currentType: Status;
  currentUser: User;
  statuses: Status[];
  addedSuccess = false;
  errorMessage: string;

  constructor(private userService: UserService, private caseService: CaseService,
              private statusService: StatusService, private router: Router, private route: ActivatedRoute) {
    this.aCase = {} as Case;
    this.currentUser = {} as User;
    this.currentType = {} as Status;
    this.statuses = [];
  }

  ngOnInit() {
    this.statusService.getStatuses().subscribe(
      statuses => this.statuses = statuses,
      error => this.errorMessage = error as any);

    const userId = this.route.snapshot.params.id;
    this.userService.getUserById(userId).subscribe(
      response => {
        this.currentUser = response;
      },
      error => this.errorMessage = error as any);
  }

  onSubmit(aCase: Case) {
    aCase.id = null;
    aCase.user = this.currentUser;
    // format output from datepicker to short string yyyy/mm/dd format
    this.caseService.addCase(aCase).subscribe(
      newCase => {
        this.aCase = newCase;
        this.addedSuccess = true;
        this.gotoUserDetail();
      },
      error => this.errorMessage = error as any);
  }

  gotoUserDetail() {
    this.router.navigate(['/users', this.currentUser.id]);
  }

}

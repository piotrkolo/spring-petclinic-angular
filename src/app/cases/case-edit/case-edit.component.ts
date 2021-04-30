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
import {CaseService} from '../case.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../users/user';
import {Status} from '../../statuses/status';
import {StatusService} from '../../statuses/status.service';

import * as moment from 'moment';

@Component({
  selector: 'app-case-edit',
  templateUrl: './case-edit.component.html',
  styleUrls: ['./case-edit.component.css']
})
export class CaseEditComponent implements OnInit {
  aCase: Case;
  @Input() currentStatus: Status;
  currentUser: User;
  statuses: Status[];
  errorMessage: string;

  constructor(private caseService: CaseService, private statusService: StatusService, private router: Router,
              private route: ActivatedRoute) {
    this.aCase = {} as Case;
    this.currentUser = {} as User;
    this.currentStatus = {} as Status;
    this.statuses = [];
  }

  ngOnInit() {

    this.statusService.getStatuses().subscribe(
      statuses => this.statuses = statuses,
      error => this.errorMessage = error as any);

    const caseId = this.route.snapshot.params.id;
    this.caseService.getCaseById(caseId).subscribe(
      aCase => {
        this.aCase = aCase;
        this.currentUser = this.aCase.user;
        this.currentStatus = this.aCase.status;
      },
      error => this.errorMessage = error as any);

  }

  onSubmit(aCase: Case) {
    aCase.status = this.currentStatus;
    const that = this;
    // format output from datepicker to short string yyyy/mm/dd format

    this.caseService.updateCase(aCase.id.toString(), aCase).subscribe(
      res => this.gotoUserDetail(this.currentUser),
      error => this.errorMessage = error as any
    );
  }

  gotoUserDetail(user: User) {
    this.router.navigate(['/users', user.id]);
  }

}

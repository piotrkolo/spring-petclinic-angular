/*
 *
 *  * Copyright 2017-2018 the original author or authors.
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
import {Status} from '../status';
import {StatusService} from '../status.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-status-edit',
  templateUrl: './status-edit.component.html',
  styleUrls: ['./status-edit.component.css']
})
export class StatusEditComponent implements OnInit {
  status: Status;
  errorMessage: string;

  constructor(private statusService: StatusService, private route: ActivatedRoute, private router: Router) {
    this.status = {} as Status;
  }

  ngOnInit() {
    const statusId = this.route.snapshot.params.id;
    this.statusService.getStatusById(statusId).subscribe(
      status => this.status = status,
      error => this.errorMessage = error as any);
  }

  onSubmit(status: Status) {
    this.statusService.updateStatus(status.id.toString(), status).subscribe(
      res => {
        console.log('update success');
        this.onBack();
      },
      error => this.errorMessage = error as any);

  }

  onBack() {
    this.router.navigate(['/statuses']);
  }

}

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
import {Router} from '@angular/router';
import {CaseService} from '../case.service';
import {Case} from '../case';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.css']
})
export class CaseListComponent implements OnInit {
  errorMessage: string;
  @Input() aCase: Case;
  responseStatus: number;
  deleteSuccess = false;

  constructor(private router: Router, private caseService: CaseService) {
    this.aCase = {} as Case;
  }

  ngOnInit() {
  }

  editCase(aCase: Case) {
    this.router.navigate(['/cases', aCase.id, 'edit']);
  }

  deleteCase(aCase: Case) {
    this.caseService.deleteCase(aCase.id.toString()).subscribe(
      response => {
        this.deleteSuccess = true;
        this.aCase = {} as Case;
      },
      error => this.errorMessage = error as any);
  }

  addNote(aCase: Case) {
    this.router.navigate(['/cases', aCase.id, 'notes', 'add']);
  }

}

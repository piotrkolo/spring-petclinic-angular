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
import {Note} from '../note';
import {NoteService} from '../note.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CaseService} from '../../cases/case.service';
import {Case} from '../../cases/case';
import {Status} from '../../statuses/status';
import {User} from '../../users/user';

import * as moment from 'moment';

@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.css']
})
export class NoteAddComponent implements OnInit {

  note: Note;
  currentCase: Case;
  currentUser: User;
  currentStatus: Status;
  addedSuccess = false;
  errorMessage: string;

  constructor(private noteService: NoteService, private caseService: CaseService, private router: Router, private route: ActivatedRoute) {
    this.note = {} as Note;
    this.currentCase = {} as Case;
    this.currentUser = {} as User;
    this.currentStatus = {} as Status;

  }

  ngOnInit() {
    console.log(this.route.parent);
    const caseId = this.route.snapshot.params.id;
    this.caseService.getCaseById(caseId).subscribe(
      response => {
        this.currentCase = response;
        this.note.case = this.currentCase;
        this.currentStatus = this.currentCase.status;
        this.currentUser = this.currentCase.user;
      },
      error => this.errorMessage = error as any);
  }

  onSubmit(note: Note) {
    note.id = null;
    const that = this;

    // format output from datepicker to short string yyyy/mm/dd format
    note.date = moment(note.date).format('YYYY/MM/DD');


    this.noteService.addNote(note).subscribe(
      newNote => {
        this.note = newNote;
        this.addedSuccess = true;
        that.gotoUserDetail();
      },
      error => this.errorMessage = error as any
    );
  }

  gotoUserDetail() {
    this.router.navigate(['/users', this.currentUser.id]);
  }

}

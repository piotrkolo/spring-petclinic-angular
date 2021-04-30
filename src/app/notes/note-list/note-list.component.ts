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
import {Note} from '../note';
import {NoteService} from '../note.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  @Input() notes: Note[];
  responseStatus: number;
  noNotes = false;
  errorMessage: string;

  constructor(private router: Router, private noteService: NoteService) {
    this.notes = [];
  }

  ngOnInit() {
  }

  editNote(note: Note) {
    this.router.navigate(['/notes', note.id, 'edit']);
  }

  deleteNote(note: Note) {
    this.noteService.deleteNote(note.id.toString()).subscribe(
      response => {
        this.responseStatus = response;
        console.log('delete success');
        this.notes.splice(this.notes.indexOf(note), 1 );
        if (this.notes.length === 0) {
            this.noNotes = true;
          }
      },
      error => this.errorMessage = error as any);
  }

}

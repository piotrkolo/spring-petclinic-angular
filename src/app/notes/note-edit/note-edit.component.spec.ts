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

/* tslint:disable:no-unused-variable */

/**
 * @author Vitaliy Fedoriv
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {NoteEditComponent} from './note-edit.component';
import {FormsModule} from '@angular/forms';
import {NoteService} from '../note.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../testing/router-stubs';
import {Note} from '../note';
import {Observable, of} from 'rxjs';
import {Case} from '../../cases/case';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import Spy = jasmine.Spy;

class NoteServiceStub {
  getNoteById(noteId: string): Observable<Note> {
    return of();
  }
}

describe('NoteEditComponent', () => {
  let component: NoteEditComponent;
  let fixture: ComponentFixture<NoteEditComponent>;
  let noteService: NoteService;
  let testNote: Note;
  let testCase: Case;
  let spy: Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoteEditComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, MatDatepickerModule, MatMomentDateModule],
      providers: [
        {provide: NoteService, useClass: NoteServiceStub},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteEditComponent);
    component = fixture.componentInstance;
    testCase = {
      id: 1,
      name: 'Leo',
      birthDate: '2010-09-07',
      type: {id: 1, name: 'cat'},
      user: {
        id: 1,
        firstName: 'George',
        lastName: 'Franklin',
        address: '110 W. Liberty St.',
        city: 'Madison',
        telephone: '6085551023',
        cases: null
      },
      notes: null
    };
    testNote = {
      id: 1,
      date: '2016-09-07',
      details: '',
      case: testCase
    };

    noteService = fixture.debugElement.injector.get(NoteService);
    spy = spyOn(noteService, 'getNoteById')
      .and.returnValue(of(testNote));

    fixture.detectChanges();
  });

  it('should create NoteEditComponent', () => {
    expect(component).toBeTruthy();
  });
});

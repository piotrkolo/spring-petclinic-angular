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

import {NoteListComponent} from './note-list.component';
import {FormsModule} from '@angular/forms';
import {NoteService} from '../note.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../testing/router-stubs';
import {Note} from '../note';
import {Case} from '../../cases/case';
import {Observable, of} from 'rxjs';
import Spy = jasmine.Spy;

class NoteServiceStub {
  deleteNote(noteId: string): Observable<number> {
    return of();
  }
}

describe('NoteListComponent', () => {
  let component: NoteListComponent;
  let fixture: ComponentFixture<NoteListComponent>;
  let noteService: NoteService;
  let testNotes: Note[];
  let testCase: Case;
  let spy: Spy;
  let responseStatus: number;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoteListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule],
      providers: [
        {provide: NoteService, useClass: NoteServiceStub},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteListComponent);
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
    testNotes =  [{
      id: 1,
      date: '2016-09-07',
      description: '',
      case: testCase
    }];

    noteService = fixture.debugElement.injector.get(NoteService);
    responseStatus = 204; // success delete return NO_CONTENT
    component.notes = testNotes;

    spy = spyOn(noteService, 'deleteNote')
      .and.returnValue(of(responseStatus));

    fixture.detectChanges();
  });

  it('should create NoteListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteNote() method', () => {
    fixture.detectChanges();
    component.deleteNote(component.notes[0]);
    expect(spy.calls.any()).toBe(true, 'deleteNote called');
  });

});

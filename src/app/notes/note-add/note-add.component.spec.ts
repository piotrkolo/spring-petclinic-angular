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

import {NoteAddComponent} from './note-add.component';
import {FormsModule} from '@angular/forms';
import {NoteService} from '../note.service';
import {CaseService} from '../../cases/case.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../testing/router-stubs';
import {Case} from '../../cases/case';
import {Observable, of} from 'rxjs';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import Spy = jasmine.Spy;

class CaseServiceStub {
  addCase(case: Case): Observable<Case> {
    return of();
  }
  getCaseById(caseId: string): Observable<Case> {
    return of();
  }
}

class NoteServiceStub {
}

describe('NoteAddComponent', () => {
  let component: NoteAddComponent;
  let fixture: ComponentFixture<NoteAddComponent>;
  let caseService: CaseService;
  let noteService: NoteService;
  let testCase: Case;
  let spy: Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoteAddComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, MatDatepickerModule, MatMomentDateModule],
      providers: [
        {provide: CaseService, useClass: CaseServiceStub},
        {provide: NoteService, useCLass: NoteServiceStub},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteAddComponent);
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
    caseService = fixture.debugElement.injector.get(CaseService);
    noteService = fixture.debugElement.injector.get(NoteService);
    spy = spyOn(caseService, 'addCase')
      .and.returnValue(of(testCase));

    fixture.detectChanges();
  });

  it('should create NoteAddComponent', () => {
    expect(component).toBeTruthy();
  });
});

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

import {CaseEditComponent} from './case-edit.component';
import {FormsModule} from '@angular/forms';
import {CaseService} from '../case.service';
import {UserService} from '../../users/user.service';
import {StatusService} from '../../statuses/status.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../testing/router-stubs';
import {Case} from '../case';
import {Observable, of} from 'rxjs';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {Status} from '../../statuses/status';
import Spy = jasmine.Spy;

class UserServiceStub {

}

class CaseServiceStub {
  updateCase(caseId: string, aCase: Case): Observable<Case> {
    return of();
  }
  getCaseById(caseId: string): Observable<Case> {
    return of();
  }
}

class StatusServiceStub {
  getStatuses(): Observable<Status[]> {
    return of();
  }
}

describe('CaseEditComponent', () => {
  let component: CaseEditComponent;
  let fixture: ComponentFixture<CaseEditComponent>;
  let caseService: CaseService;
  let testCase: Case;
  let spy: Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaseEditComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, MatDatepickerModule, MatMomentDateModule],
      providers: [
        {provide: CaseService, useClass: CaseServiceStub},
        {provide: UserService, useClass: UserServiceStub},
        {provide: StatusService, useClass: StatusServiceStub},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseEditComponent);
    component = fixture.componentInstance;
    testCase = {
      id: 1,
      name: 'Leo',
      status: {id: 1, name: 'OPEN'},
      user: {
        id: 1,
        firstName: 'George',
        lastName: 'Franklin',
        email: 'leo@gmail.com',
        cases: null
      },
      notes: null
    };
    caseService = fixture.debugElement.injector.get(CaseService);
    spy = spyOn(caseService, 'updateCase')
      .and.returnValue(of(testCase));

    fixture.detectChanges();
  });

  it('should create CaseEditComponent', () => {
    expect(component).toBeTruthy();
  });
});

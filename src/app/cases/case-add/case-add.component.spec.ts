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

import {CaseAddComponent} from './case-add.component';
import {FormsModule} from '@angular/forms';
import {CaseService} from '../case.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../testing/router-stubs';
import {Observable, of} from 'rxjs';
import {Case} from '../case';
import {UserService} from '../../users/user.service';
import {StatusService} from '../../statuses/status.service';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {User} from '../../users/user';
import {Status} from '../../statuses/status';
import Spy = jasmine.Spy;

class UserServiceStub {
  getUserById(): Observable<User> {
    return of();
  }
}

class CaseServiceStub {
  getCaseById(caseId: string): Observable<Case> {
    return of();
  }
}

class StatusServiceStub {
  getStatuses(): Observable<Status[]> {
    return of();
  }
}

describe('CaseAddComponent', () => {
  let component: CaseAddComponent;
  let fixture: ComponentFixture<CaseAddComponent>;
  let caseService: CaseService;
  let testCase: Case;
  let spy: Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaseAddComponent],
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
    fixture = TestBed.createComponent(CaseAddComponent);
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
    spy = spyOn(caseService, 'getCaseById')
      .and.returnValue(of(testCase));

    fixture.detectChanges();
  });

  it('should create CaseAddComponent', () => {
    expect(component).toBeTruthy();
  });
});

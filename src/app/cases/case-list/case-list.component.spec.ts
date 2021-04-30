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

import {CaseListComponent} from './case-list.component';
import {FormsModule} from '@angular/forms';
import {CaseService} from '../case.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../testing/router-stubs';
import {Case} from '../case';
import {Observable, of} from 'rxjs';
import Spy = jasmine.Spy;

class CaseServiceStub {
  deleteCase(caseId: string): Observable<number> {
    return of();
  }
}

describe('CaseListComponent', () => {
  let component: CaseListComponent;
  let fixture: ComponentFixture<CaseListComponent>;
  let inputCase: Case;
  let caseService: CaseService;
  let spy: Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaseListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule],
      providers: [
        {provide: CaseService, useClass: CaseServiceStub},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseListComponent);
    component = fixture.componentInstance;
    inputCase = {
      id: 1,
      name: 'Leo',
      type: {id: 1, name: 'cat'},
      user: {
        id: 1,
        firstName: 'George',
        lastName: 'Franklin',
        email: 'leo@gmail.com',
        cases: null
      },
      notes: null
    };
    component.aCase = inputCase;
    caseService = fixture.debugElement.injector.get(CaseService);
    spy = spyOn(caseService, 'deleteCase')
      .and.returnValue(of(true));

    fixture.detectChanges();
  });

  it('should create CaseListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteCase() method', () => {
    fixture.detectChanges();
    component.deleteCase(component.aCase);
    expect(spy.calls.any()).toBe(true, 'deleteCase called');
  });

});

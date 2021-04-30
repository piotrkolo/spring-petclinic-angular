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
import {By} from '@angular/platform-browser';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';

import {UserListComponent} from './user-list.component';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../user.service';
import {User} from '../user';
import {Observable, of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonModule} from '@angular/common';
import {PartsModule} from '../../parts/parts.module';
import {ActivatedRouteStub} from '../../testing/router-stubs';
import {UserDetailComponent} from '../user-detail/user-detail.component';
import {UsersModule} from '../users.module';
import {DummyComponent} from '../../testing/dummy.component';
import {UserAddComponent} from '../user-add/user-add.component';
import {UserEditComponent} from '../user-edit/user-edit.component';
import Spy = jasmine.Spy;


class UserServiceStub {
  getUsers(): Observable<User[]> {
    return of();
  }
}

describe('UserListComponent', () => {

  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService = new UserServiceStub();
  let spy: Spy;
  let de: DebugElement;
  let el: HTMLElement;


  const testUser: User = {
    id: 1,
    firstName: 'George',
    lastName: 'Franklin',
    address: '110 W. Liberty St.',
    city: 'Madison',
    telephone: '6085551023',
    cases: null
  };
  let testUsers: User[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DummyComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [CommonModule, FormsModule, PartsModule, UsersModule,
        RouterTestingModule.withRoutes(
          [{path: 'users', component: UserListComponent},
            {path: 'users/add', component: UserAddComponent},
            {path: 'users/:id', component: UserDetailComponent},
            {path: 'users/:id/edit', component: UserEditComponent}
          ])],
      providers: [
        {provide: UserService, useValue: userService},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testUsers = [{
      id: 1,
      firstName: 'George',
      lastName: 'Franklin',
      address: '110 W. Liberty St.',
      city: 'Madison',
      telephone: '6085551023',
      cases: [{
        id: 1,
        name: 'Leo',
        birthDate: '2010-09-07',
        type: {id: 1, name: 'cat'},
        user: null,
        notes: null
      }]
    }];

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = fixture.debugElement.injector.get(UserService);
    spy = spyOn(userService, 'getUsers')
      .and.returnValue(of(testUsers));

  });

  it('should create UserListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit() method', () => {
    fixture.detectChanges();
    expect(spy.calls.any()).toBe(true, 'getUsers called');
  });


  it(' should show full name after getUsers observable (async) ', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => { // wait for async getUsers
      fixture.detectChanges();        // update view with name
      de = fixture.debugElement.query(By.css('.userFullName'));
      el = de.nativeElement;
      expect(el.innerText).toBe((testUser.firstName.toString() + ' ' + testUser.lastName.toString()));
    });
  }));

});

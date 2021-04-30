import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StatusEditComponent} from './status-edit.component';
import {StatusService} from '../status.service';
import {Status} from '../status';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../testing/router-stubs';
import {FormsModule} from '@angular/forms';
import {Observable, of} from 'rxjs/index';
import Spy = jasmine.Spy;

class StatusServiceStub {
  getStatusById(typeId: string): Observable<Status> {
    return of();
  }
}


describe('StatusEditComponent', () => {
  let component: StatusEditComponent;
  let fixture: ComponentFixture<StatusEditComponent>;
  let statusService: StatusService;
  let spy: Spy;
  let testStatus: Status;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusEditComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule],
      providers: [
        {provide: StatusService, useClass: StatusServiceStub},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusEditComponent);
    component = fixture.componentInstance;
    testStatus = {
      id: 1,
      name: 'test'
    };

    statusService = fixture.debugElement.injector.get(StatusService);
    spy = spyOn(statusService, 'getStatusById')
      .and.returnValue(of(testStatus));

    fixture.detectChanges();
  });

  it('should create StatusEditComponent', () => {
    expect(component).toBeTruthy();
  });
});

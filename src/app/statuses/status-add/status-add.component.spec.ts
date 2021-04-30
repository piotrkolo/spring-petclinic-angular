import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StatusAddComponent} from './status-add.component';
import {StatusService} from '../status.service';
import {Status} from '../status';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../testing/router-stubs';
import {FormsModule} from '@angular/forms';
import {Observable, of} from 'rxjs';
import Spy = jasmine.Spy;

class StatusServiceStub {
  addStatus(status: Status): Observable<Status> {
    return of();
  }
}

describe('StatusAddComponent', () => {
  let component: StatusAddComponent;
  let fixture: ComponentFixture<StatusAddComponent>;
  let statusService: StatusService;
  let spy: Spy;
  let testStatus: Status;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusAddComponent ],
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
    fixture = TestBed.createComponent(StatusAddComponent);
    component = fixture.componentInstance;
    testStatus = {
      id: 1,
      name: 'test'
    };

    statusService = fixture.debugElement.injector.get(StatusService);
    spy = spyOn(statusService, 'addStatus')
      .and.returnValue(of(testStatus));

    fixture.detectChanges();
  });

  it('should create StatusAddComponent', () => {
    expect(component).toBeTruthy();
  });
});

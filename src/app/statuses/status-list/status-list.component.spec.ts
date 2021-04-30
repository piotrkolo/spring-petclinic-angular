import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StatusListComponent} from './status-list.component';
import {StatusService} from '../status.service';
import {Status} from '../status';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../testing/router-stubs';
import {FormsModule} from '@angular/forms';
import {Observable, of} from 'rxjs/index';
import Spy = jasmine.Spy;

class StatusServiceStub {
  deleteStatus(typeId: string): Observable<number> {
    return of();
  }
  getStatuses(): Observable<Status[]> {
    return of();
  }
}


describe('StatusListComponent', () => {
  let component: StatusListComponent;
  let fixture: ComponentFixture<StatusListComponent>;
  let statusService: StatusService;
  let spy: Spy;
  let testStatuses: Status[];
  let responseStatus: number;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusListComponent ],
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
    fixture = TestBed.createComponent(StatusListComponent);
    component = fixture.componentInstance;

    testStatuses = [{
      id: 1,
      name: 'test'
    }];

    statusService = fixture.debugElement.injector.get(StatusService);
    responseStatus = 204; // success delete return NO_CONTENT
    component.statuses = testStatuses;

    spy = spyOn(statusService, 'deleteStatus')
      .and.returnValue(of(responseStatus));

    fixture.detectChanges();
  });

  it('should create StatusListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteStatus() method', () => {
    fixture.detectChanges();
    component.deleteStatus(component.statuses[0]);
    expect(spy.calls.any()).toBe(true, 'deleteStatus called');
  });
});

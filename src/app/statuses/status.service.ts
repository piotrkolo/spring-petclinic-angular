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

/**
 * @author Vitaliy Fedoriv
 */

import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Status} from './status';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';
import {HandleError, HttpErrorHandler} from '../error.service';

@Injectable()
export class StatusService {

  entityUrl = environment.REST_API_URL + 'statuses';

  private readonly handlerError: HandleError;

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.handlerError = httpErrorHandler.createHandleError('UserService');
  }

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.entityUrl)
      .pipe(
        catchError(this.handlerError('getStatuses', []))
      );
  }

  getStatusById(typeId: string): Observable<Status> {
    return this.http.get<Status>((this.entityUrl + '/' + typeId))
      .pipe(
        catchError(this.handlerError('getStatusById', {} as Status))
      );
  }

  updateStatus(typeId: string, status: Status): Observable<Status> {
    return this.http.put<Status>(this.entityUrl + '/' + typeId, status)
      .pipe(
        catchError(this.handlerError('updateStatus', status))
      );
  }

  addStatus(status: Status): Observable<Status> {
    return this.http.post<Status>(this.entityUrl, status)
      .pipe(
        catchError(this.handlerError('addStatus', status))
      );
  }

  deleteStatus(typeId: string): Observable<number> {
    return this.http.delete<number>(this.entityUrl + '/' + typeId)
      .pipe(
        catchError(this.handlerError('deleteStatus', 0))
      );
  }

}

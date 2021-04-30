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
import {Observable, pipe} from 'rxjs';
import {Case} from './case';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from '../error.service';

@Injectable()
export class CaseService {

  private entityUrl = environment.REST_API_URL + 'cases';

  private readonly handlerError: HandleError;

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.handlerError = httpErrorHandler.createHandleError('UserService');
  }

  getCases(): Observable<Case[]> {
    return this.http.get<Case[]>(this.entityUrl)
      .pipe(
        catchError(this.handlerError('getCases', []))
      );
  }

  getCaseById(caseId: string): Observable<Case> {
    return this.http.get<Case>(this.entityUrl + '/' + caseId)
      .pipe(catchError(this.handlerError('getCaseById', {} as Case))
      );
  }

  addCase(aCase: Case): Observable<Case> {
    return this.http.post<Case>(this.entityUrl, aCase)
      .pipe(catchError(this.handlerError('addCase', aCase))
      );
  }

  updateCase(caseId: string, aCase: Case): Observable<Case> {
    return this.http.put<Case>(this.entityUrl + '/' + caseId, aCase)
      .pipe(catchError(this.handlerError('updateCase', aCase))
      );
  }

  deleteCase(caseId: string): Observable<number> {
    return this.http.delete<number>(this.entityUrl + '/' + caseId)
      .pipe(
        catchError(this.handlerError('deleteCase', 0))
      );
  }

}

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
import {Observable} from 'rxjs';
import {Note} from './note';
import {environment} from '../../environments/environment';
import {HandleError, HttpErrorHandler} from '../error.service';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';

@Injectable()
export class NoteService {

  private entityUrl = environment.REST_API_URL + 'notes';

  private readonly handlerError: HandleError;

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.handlerError = httpErrorHandler.createHandleError('UserService');
  }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.entityUrl)
      .pipe(
        catchError(this.handlerError('getNotes', []))
      );
  }

  getNoteById(noteId: string): Observable<Note> {
    return this.http.get<Note>(this.entityUrl + '/' + noteId)
      .pipe(
        catchError(this.handlerError('getNoteById', {} as Note))
      );
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.entityUrl, note)
      .pipe(
        catchError(this.handlerError('addNote', note))
      );
  }

  updateNote(noteId: string, note: Note): Observable<Note> {
    return this.http.put<Note>(this.entityUrl + '/' + noteId, note)
      .pipe(
        catchError(this.handlerError('updateNote', note))
      );
  }

  deleteNote(noteId: string): Observable<number> {
    return this.http.delete<number>(this.entityUrl + '/' + noteId)
      .pipe(
        catchError(this.handlerError('deleteNote', 0))
      );

  }


}

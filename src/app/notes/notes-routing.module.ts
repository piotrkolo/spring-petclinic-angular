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

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NoteListComponent} from './note-list/note-list.component';
import {NoteEditComponent} from './note-edit/note-edit.component';
import {NoteAddComponent} from './note-add/note-add.component';

const noteRoutes: Routes = [
  {path: 'notes', component: NoteListComponent},
  {path: 'notes/add', component: NoteAddComponent},
  {path: 'notes/:id/edit', component: NoteEditComponent}

];


@NgModule({
  imports: [
    RouterModule.forChild(noteRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class NotesRoutingModule {
}

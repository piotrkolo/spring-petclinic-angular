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

import {NotesRoutingModule} from './notes-routing.module';
import {CommonModule} from '@angular/common';
import {NoteListComponent} from './note-list/note-list.component';
import {NoteEditComponent} from './note-edit/note-edit.component';
import {NgModule} from '@angular/core';
import {NoteService} from './note.service';
import {NoteAddComponent} from './note-add/note-add.component';
import {FormsModule} from '@angular/forms';
import {CasesRoutingModule} from '../cases/cases-routing.module';
import {MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'YYYY/MM/DD',
    monthYearA11yLabel: 'MM YYYY',
  },
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    NotesRoutingModule,
    CasesRoutingModule
  ],
  declarations: [
    NoteListComponent,
    NoteEditComponent,
    NoteAddComponent
  ],
  exports: [
    NoteListComponent,
    NoteEditComponent,
    NoteAddComponent
  ],
  providers: [
    NoteService,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class NotesModule {
}

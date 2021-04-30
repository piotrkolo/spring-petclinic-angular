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
import {CommonModule} from '@angular/common';
import {CasesRoutingModule} from './cases-routing.module';
import {CaseListComponent} from './case-list/case-list.component';
import {CaseService} from './case.service';
import {NotesModule} from '../notes/note.module';
import {CaseEditComponent} from './case-edit/case-edit.component';
import {FormsModule} from '@angular/forms';
import {CaseAddComponent} from './case-add/case-add.component';

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
    CasesRoutingModule,
    NotesModule  ],
  declarations: [
    CaseListComponent,
    CaseEditComponent,
    CaseAddComponent
  ],
  exports: [
    CaseListComponent,
    CaseEditComponent,
    CaseAddComponent
  ],
  providers: [
    CaseService,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class CasesModule {
}



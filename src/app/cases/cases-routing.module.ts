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

import {RouterModule, Routes} from '@angular/router';
import {CaseListComponent} from './case-list/case-list.component';
import {NgModule} from '@angular/core';
import {NoteAddComponent} from '../notes/note-add/note-add.component';
import {CaseEditComponent} from './case-edit/case-edit.component';
import {CaseAddComponent} from './case-add/case-add.component';


const caseRoutes: Routes = [
  {path: 'cases', component: CaseListComponent},
  {path: 'cases/add', component: CaseAddComponent},
  {
    path: 'cases/:id',
    children: [
      {
        path: 'edit',
        component: CaseEditComponent
      },
      {
        path: 'notes\/add',
        component: NoteAddComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(caseRoutes)],
  exports: [RouterModule]
})

export class CasesRoutingModule {
}

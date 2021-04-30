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
import {UserService} from './user.service';
import {UserListComponent} from './user-list/user-list.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UserAddComponent} from './user-add/user-add.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UsersRoutingModule} from './users-routing.module';
import {CasesModule} from '../cases/cases.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    CasesModule
  ],
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    UserAddComponent
  ],
  providers: [UserService]

})

export class UsersModule {
}

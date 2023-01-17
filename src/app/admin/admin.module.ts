import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { material_imports } from '../shared/material-import';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FakultetComponent } from './component/fakultet/fakultet.component';
import { GuruhComponent } from './component/guruh/guruh.component';
import { LoyihaComponent } from './component/loyiha/loyiha.component';
import { TalabaComponent } from './component/talaba/talaba.component';
import { XarakterComponent } from './component/xarakter/xarakter.component';
import { YunalishComponent } from './component/yunalish/yunalish.component';
import { YutuqComponent } from './component/yutuq/yutuq.component';
import { UserComponent } from './component/user/user.component';
import { LoginComponent } from '../public/login/login.component';
import { StudentComponent } from './component/student/student.component';
import {MatChipsModule} from '@angular/material/chips';



@NgModule({
  declarations: [
    AdminComponent,
    FakultetComponent,
    GuruhComponent,
    LoyihaComponent,
    TalabaComponent,
    DashboardComponent,
    XarakterComponent,
    YunalishComponent,
    YutuqComponent,
    UserComponent,
    LoginComponent,
    StudentComponent
  ],
  imports: [
    
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    ...material_imports
  ]
  ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }

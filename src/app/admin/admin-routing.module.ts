import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FakultetComponent } from './component/fakultet/fakultet.component';
import { GuruhComponent } from './component/guruh/guruh.component';
import { LoyihaComponent } from './component/loyiha/loyiha.component';
import { StudentComponent } from './component/student/student.component';
import { TalabaComponent } from './component/talaba/talaba.component';
import { UserComponent } from './component/user/user.component';
import { XarakterComponent } from './component/xarakter/xarakter.component';
import { YunalishComponent } from './component/yunalish/yunalish.component';
import { YutuqComponent } from './component/yutuq/yutuq.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
      
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'fakultet',
        component: FakultetComponent
      },
      {
        path: 'guruh',
        component: GuruhComponent
      },
      {
        path: 'user',
        component: UserComponent  
      }
      ,{
        path: 'loyiha',
        component: LoyihaComponent
      }
      ,{
        path: 'talaba',
        component: TalabaComponent
      }
      ,{
        path: 'xarakter',
        component: XarakterComponent
      }
      ,{
        path: 'yunalish',
        component: YunalishComponent
      }
      ,{
        path: 'yutuq',
        component: YutuqComponent
      }
     
      ,{
        path: 'student',
        component: StudentComponent
      },
     
    ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class AdminRoutingModule { }

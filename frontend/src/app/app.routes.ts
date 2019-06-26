import {Routes,RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { QuesComponent } from './ques/ques.component';
import { QuesPageComponent } from './ques-page/ques-page.component';
import { RespPageComponent } from './resp-page/resp-page.component';
import { ContainerComponent } from './container/container.component';
import { FinalComponent } from './final/final.component';
import { AdminComponent } from './admin/signup/admin.component';
import { LoginComponent } from './admin/login/login.component';
import { NavPageComponent } from './nav-page/nav-page.component';

const routes:Routes = [
    {
        path: '',
        redirectTo: 'response',
        pathMatch: 'full'
    },
    {
      path: 'admin',
      component : AdminComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
        path:'main/:id',
        component: ContainerComponent
    },
    {
      path:'quest/:token',
      component: QuesPageComponent
    },
    {
      path:'response/:token',
      component: RespPageComponent
    },
    {
      path: 'done',
      component: FinalComponent
    },
    {
      path: 'navPage',
      component: NavPageComponent
    }
]

export const APP_ROUTES_PROVIDER = RouterModule.forRoot(routes);

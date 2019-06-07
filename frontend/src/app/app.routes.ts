import {Routes,RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { QuesComponent } from './ques/ques.component';
import { QuesPageComponent } from './ques-page/ques-page.component';
import { RespPageComponent } from './resp-page/resp-page.component';
import { ContainerComponent } from './container/container.component';
import { FinalComponent } from './final/final.component';

const routes:Routes = [
    {
        path: '',
        redirectTo: 'response',
        pathMatch: 'full'
    },
    {
        path:'qweqjvnvjiadsafkajkjsaiqwoqninviw',
        component: ContainerComponent
    },
    {
      path:'ques',
      component: QuesPageComponent
    },
    {
      path:'response',
      component: RespPageComponent
    },
    {
      path: 'done',
      component: FinalComponent
    }
]

export const APP_ROUTES_PROVIDER = RouterModule.forRoot(routes);

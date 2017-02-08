import { HomeComponent } from './home.component';
import { AuthGuard } from '../../shared/go/services/index';
export const HomeRoutes: Array<any> = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  }
];

// app
import { HomeRoutes } from './home/home.routes';
import { LoginRoutes } from './login/login.routes';


export const routes: Array<any> = [
  ...HomeRoutes,
  ...LoginRoutes
];

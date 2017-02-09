import { DirectoryService} from './directory.service';
import { CoreService} from './core.service';
import { AuthGuard} from './auth-guard.service';
import { AuthService} from './auth.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

export const GO_PROVIDERS: any[] = [
  DirectoryService,
  CoreService,
  CookieService,
  AuthService,
  AuthGuard
];

export * from './directory.service';
export * from './core.service';
export * from './auth-guard.service';
export * from './auth.service';
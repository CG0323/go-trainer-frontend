import { DirectoryService} from './directory.service';
import { CoreService} from './core.service';
import { AuthGuard} from './auth-guard.service'
import { CookieService } from 'angular2-cookie/services/cookies.service';

export const GO_PROVIDERS: any[] = [
  DirectoryService,
  CoreService,
  AuthGuard,
  CookieService
];

export * from './directory.service';
export * from './core.service';
export * from './auth-guard.service';
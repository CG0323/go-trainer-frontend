import { DirectoryService} from './directory.service';
import { CoreService} from './core.service';
import { AuthGuard} from './auth-guard.service'

export const GO_PROVIDERS: any[] = [
  DirectoryService,
  CoreService,
  AuthGuard
];

export * from './directory.service';
export * from './core.service';
export * from './auth-guard.service';
 import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LocalDataStorageService } from './localDataStorage.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _localDataStore: LocalDataStorageService,
        private _router: Router) {}
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean  {
            if ( this._localDataStore.getLocalDataStorage('userDetails') &&
             this._localDataStore.getLocalDataStorage('userDetails') != null) {
                 return true;
            } else {
              this._router.navigateByUrl('/');
            }

    }

}
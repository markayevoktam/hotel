import { Injectable, isDevMode } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccountService } from './account.service';
import { JwtUtil } from './jwtutil';


@Injectable({ providedIn: 'root' })
export class UserRouteAccessGuard implements CanActivate {
    constructor(private router: Router, private _snackBar: MatSnackBar, private jwtUtil: JwtUtil, private accountService: AccountService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      
                if (!!this.jwtUtil.getToken()) {
                    return of(true);
                  }
                this._snackBar.open("Sizga bu bo'limda ishlashga huquq berilmagan!", 'X ', {
                    duration: 4000,
                    verticalPosition: 'top',

                });
               // this.stateStorageService.storeUrl(state.url);
                this.router.navigate(['/login']);
                return of(false);
            


            

        
    }
}
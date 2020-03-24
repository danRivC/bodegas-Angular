import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import { Route } from '@angular/compiler/src/core';
import { AutenticationService } from '../login/service/autentication.service';


@Injectable()
export class AuthGuardService implements CanActivate{
    constructor(private accountService: AutenticationService, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
        if(this.accountService.estaLogueado()){
            console.log(this.accountService.estaLogueado());
            return true;
        }else{
            this.router.navigate(['/login']);
            return false;
        }
    }
}
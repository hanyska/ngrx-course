import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, logout } from './auth.actions';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              private router: Router) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      tap( action => localStorage.setItem('user', JSON.stringify(action.user)))
    ),
    {dispatch: false}
  );

  logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(logout),
        tap( _ => {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        })
      ),
    {dispatch: false}
  );
}

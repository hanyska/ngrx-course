import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Course } from '../model/course';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthState } from '../../auth/store/auth.reducers';
import { Store } from '@ngrx/store';
import { first, tap } from 'rxjs/operators';
import { loadAllCourses } from './store/course.actions';
import { AppState } from '../../app.reducers';

@Injectable()
export class CoursesResolver implements Resolve<Course[]> {

  constructor(private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
     return this.store.pipe(
       tap(() => this.store.dispatch(loadAllCourses())),
       first()
     );
  }
}

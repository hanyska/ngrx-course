import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Course } from '../model/course';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { finalize, first, tap } from 'rxjs/operators';
import { loadAllCourses } from './store/course.actions';
import { AppState } from '../../app.reducers';

@Injectable()
export class CoursesResolver implements Resolve<Course[]> {

  loading = false;

  constructor(private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
     return this.store.pipe(
       tap(() => {
         if (!this.loading) {
           this.loading = true;
           this.store.dispatch(loadAllCourses());
         }
       }),
       first(),
       finalize(() => this.loading = false)
     );
  }
}

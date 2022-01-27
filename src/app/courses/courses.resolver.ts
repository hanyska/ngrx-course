import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Course } from './model/course';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, tap } from 'rxjs/operators';
import { loadAllCourses } from './course/store/course.actions';
import { AppState } from '../app.reducers';
import { areCoursesLoaded } from './store/courses.selectors';

@Injectable()
export class CoursesResolver implements Resolve<Course[]> {

  loading = false;

  constructor(private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
     return this.store.pipe(
       select(areCoursesLoaded),
       tap(loaded => {
         if (!this.loading && !loaded) {
           this.loading = true;
           this.store.dispatch(loadAllCourses());
         }
       }),
       filter(coursesLoaded => coursesLoaded),
       first(),
       finalize(() => this.loading = false)
     );
  }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { allCoursesLoaded, loadAllCourses } from './course.actions';
import { CoursesHttpService } from '../../services/courses-http.service';
import { concatMap, map } from 'rxjs/operators';

@Injectable()
export class CoursesEffects {

  constructor(private actions$: Actions,
              private coursesHttpService: CoursesHttpService) {}

  loadCourses$ = createEffect(() => this.actions$.pipe(
    ofType(loadAllCourses),
    concatMap(_ => this.coursesHttpService.findAllCourses()),
    map(courses => allCoursesLoaded({courses}))
  ));

}

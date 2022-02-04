import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { CoursesEntityService } from './services/courses-entity.service';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {
  constructor(private courseService: CoursesEntityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.courseService.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.courseService.getAll();
        }
      }),
      filter(loaded => !!loaded),
      first()
    );
  }
}

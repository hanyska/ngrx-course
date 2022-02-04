import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CourseState } from '../store/coures.reducers';
import { Store } from '@ngrx/store';
import { selectAdvancedCourses, selectBeginnerCourses, selectPromoTotal } from '../store/courses.selectors';
import { CoursesEntityService } from '../services/courses-entity.service';
import { map } from 'rxjs/operators';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number> = this.store.select(selectPromoTotal);
  beginnerCourses$: Observable<Course[]> = this.store.select(selectBeginnerCourses);
  advancedCourses$: Observable<Course[]> = this.store.select(selectAdvancedCourses);


  constructor(
    private dialog: MatDialog,
    private coursesService: CoursesEntityService,
    private store: Store<CourseState>) {
  }

  ngOnInit() {
    this.reload();
  }

  reload() {
    const courses$ = this.coursesService.entities$;
    this.promoTotal$ = courses$.pipe(map(courses => courses.filter(course => course.promo).length));
    this.beginnerCourses$ = courses$.pipe(map(courses => courses.filter(course => course.category === 'BEGINNER')));
    this.advancedCourses$ = courses$.pipe(map(courses => courses.filter(course => course.category === 'ADVANCED')));
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}

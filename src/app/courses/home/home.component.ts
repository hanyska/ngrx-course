import { Component } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CoursesHttpService } from '../services/courses-http.service';
import { CourseState } from '../store/coures.reducers';
import { Store } from '@ngrx/store';
import { selectAdvancedCourses, selectBeginnerCourses, selectPromoTotal } from '../store/courses.selectors';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  promoTotal$: Observable<number> = this.store.select(selectPromoTotal);
  beginnerCourses$: Observable<Course[]> = this.store.select(selectBeginnerCourses);
  advancedCourses$: Observable<Course[]> = this.store.select(selectAdvancedCourses);


  constructor(
    private dialog: MatDialog,
    private coursesHttpService: CoursesHttpService,
    private store: Store<CourseState>) {}

  reload() {
    this.promoTotal$ = this.store.select(selectPromoTotal);
    this.beginnerCourses$ = this.store.select(selectBeginnerCourses);
    this.advancedCourses$ = this.store.select(selectAdvancedCourses);
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { Lesson } from '../model/lesson';
import { delay, map, tap, withLatestFrom } from 'rxjs/operators';
import { LessonEntityService } from '../services/lesson-entity.service';
import { CoursesEntityService } from '../services/courses-entity.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  loading$: Observable<boolean>;
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;
  displayedColumns = ['seqNo', 'description', 'duration'];
  nextPage = 0;

  constructor(private coursesEntityService: CoursesEntityService,
              private lessonEntityService: LessonEntityService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    const courseUrl = this.route.snapshot.paramMap.get('courseUrl');
    this.course$ = this.coursesEntityService.entities$.pipe(
      map(courses => courses.find(course => course.url === courseUrl))
    );
    this.lessons$ = this.lessonEntityService.entities$.pipe(
      withLatestFrom(this.course$),
      tap(([_, course]) => {
        if (this.nextPage === 0) {
          this.loadLessonsPage(course);
        }
      }),
      map(([lessons, course]) => lessons.filter(lesson => lesson.courseId === course.id))
    );

    this.loading$ = this.lessonEntityService.loading$.pipe(delay(0));
  }


  loadLessonsPage(course: Course) {
    this.lessonEntityService.getWithQuery({
      'courseId': course.id.toString(),
      'pageNumber': this.nextPage.toString(),
      'pageSize': '3'
    });
    this.nextPage += 1;
  }

}

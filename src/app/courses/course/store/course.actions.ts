import { createAction, props } from '@ngrx/store';
import { Course } from '../../model/course';

const TAG = '[Courses Resolver]';

export const loadAllCourses = createAction(
  `${TAG} Load All Courses`,
);

export const allCoursesLoaded = createAction(
  `[Load Courses Effect] All Courses Loaded`,
  props<{courses: Course[]}>()
);


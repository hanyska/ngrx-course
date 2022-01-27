import { createAction } from '@ngrx/store';

const TAG = '[Courses Resolver]';

export const loadAllCourses = createAction(
  `${TAG} Load All Courses`,
);

export const allCoursesLoaded = createAction(
  `[Load Courses Effect] All Courses Loaded`
);


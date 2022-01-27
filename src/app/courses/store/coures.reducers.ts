import { Course } from '../model/course';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { allCoursesLoaded } from '../course/store/course.actions';

export interface CourseState extends EntityState<Course> {
  courses: Course[];
  entities: {
    [key: number]: Course
  };
  ids: number[];
}

export const adapter = createEntityAdapter<Course>();

export const initialCoursesState = adapter.getInitialState();

export const coursesReducer = createReducer(
  initialCoursesState,
  on(
    allCoursesLoaded,
    (state, action) => adapter.addAll(action.courses, state))
);

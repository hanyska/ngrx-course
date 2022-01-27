import { compareCourses, Course } from '../model/course';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { allCoursesLoaded } from '../course/store/course.actions';

export interface CourseState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
  selectId: course => course.id
});

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false
});


export const coursesReducer = createReducer(
  initialCoursesState,
  on(
    allCoursesLoaded,
    (state, action) =>
      adapter.addAll(
        action.courses,
        {
          ...state,
          allCoursesLoaded: true
        }
      ))
);

export const {
  selectAll
} = adapter.getSelectors();

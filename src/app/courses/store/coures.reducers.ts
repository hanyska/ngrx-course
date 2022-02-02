import { compareCourses, Course } from '../model/course';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { allCoursesLoaded, courseUpdated } from './course.actions';

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
  on(allCoursesLoaded, (state, action: any) =>
    adapter.addAll(
      action.courses,
      {...state, allCoursesLoaded: true}
    )
  ),
  on(courseUpdated, (state, action: any) =>
    adapter.updateOne(action.update, state)
  )
);

export const {
  selectAll
} = adapter.getSelectors();

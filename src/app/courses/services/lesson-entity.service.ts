import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Lesson } from '../model/lesson';
import { Injectable } from '@angular/core';

@Injectable()
export class LessonEntityService extends EntityCollectionServiceBase<Lesson> {
  constructor(private serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('Lesson', serviceElementFactory);
  }
}

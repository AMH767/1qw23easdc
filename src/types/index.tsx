import type {UserType} from './UserType';
import type {BannerType} from './BannerType';
import type {CourseType} from './CourseType';
import type {CategoryType} from './CategoryType';
import type {OperationType} from './OperationType';
import type {TransactionType} from './TransactionType';

export type ViewableItemsChanged = {
  viewableItems: Array<any>;
  changed: Array<any>;
};

export type {
  UserType,
  BannerType,
  TransactionType,
  OperationType,
  CategoryType,
  CourseType,
};

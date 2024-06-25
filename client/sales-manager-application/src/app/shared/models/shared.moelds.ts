import { FormControl } from '@angular/forms';

export type ToFormGroup<T> = {
  [P in keyof T]: FormControl<T[P]>;
};

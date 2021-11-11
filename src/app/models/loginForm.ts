import {FormControl} from "@angular/forms";

export interface FormField {
  title: string;
  type: string;
  suffixIcon: string;
  prefixIcon: string;
  errors: {
    message: string,
    type: string
  }[];
  formControl: FormControl
}

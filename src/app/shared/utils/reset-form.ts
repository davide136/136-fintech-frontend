import { FormGroup, NgForm } from "@angular/forms";

export class ResetForm {
  constructor(form: FormGroup, formRef: NgForm ) {
    form.reset();
    formRef.resetForm();
  }
}

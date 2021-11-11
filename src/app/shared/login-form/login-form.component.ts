import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormField} from "../../models/loginForm";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'ac-login',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Input() fields: FormField[] = [];
  @Output() submit = new EventEmitter<boolean>();
  goToRegister: string = "";

  constructor(/*route: ActivatedRoute*/) { /*console.log(route)*/ }

  clearHandler(formControl: FormControl) {
    formControl.setValue('');
  }

  formIsValid() {
    for(let f of this.fields){
      if(!f.formControl.valid) return false;
    }
    return true;
  }

  toggleType(field: FormField) {
    if( field.type == 'text')
      field.type = 'password';
    else
      field.type ='text';
  }
}

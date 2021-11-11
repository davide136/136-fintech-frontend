import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormField} from "../../models/loginForm";
import {FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'ac-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() fields: FormField[] = [];
  @Output() submit = new EventEmitter<boolean>();
  goToRegister: string = "";

  constructor(route: ActivatedRoute) { console.log(route) }

  ngOnInit(): void {
  }

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

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {


  private formBuilder: FormBuilder;
  private form: FormGroup;


  constructor
  (
    formBuilder: FormBuilder,
    private router: Router
    ){
    this.formBuilder = formBuilder;
    this.form = this.createForm();


  }


  createForm() : FormGroup {
    return this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(6)],
      repeatPassword: [''],
      cpf: ['', Validators.required],
      name: ['', Validators.required],
        postalCode: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        dist: ['', Validators.required],
        street: ['', Validators.required],
        number: ['', Validators.required]
    });

    //form.get('repeatPassword').setValidators(matchPasswordAndRepeatPassword(form));
    //return form;
  }

  getForm() : FormGroup {
    return this.form;
  }


matchPasswordAndRepeatPassword(form: FormGroup) : ValidatorFn {
  const password = form.get('password');
  const repeatPassword = form.get('repeatPassword');

  const validator = () => {
    return password?.value == repeatPassword?.value ? null : {isntMatching: true}
  };

  return validator;
}

  ngOnInit() {
    this.createForm();
  }

  register(){
    this.router.navigate(['login']);
  }

}

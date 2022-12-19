import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  form : FormGroup;
  loginForm: any;


  //injection FormBuilder - Form Reactive
  constructor(
    private fb : FormBuilder,
    private loginService: LoginService,
    private router: Router
    ) { 
    
      this.form = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      })
  }


  ngOnInit(): void {
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const formValue = this.form.value
    console.log(formValue)

    const result = this.loginService.login(formValue.username, formValue.password)
    console.log('login', result)
    if(result){
      this.form.reset;
      this.router.navigateByUrl('/home');
    }else{
      alert('Invalid username or password')
    }
  }

  // isAuthenticated():boolean{
  //   return this.loginService.isAuthenticated()
  // }

  logout(){
    this.loginService.logout()
  }

}

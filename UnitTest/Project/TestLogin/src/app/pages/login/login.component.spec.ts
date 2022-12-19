import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { blankUser, validUser } from 'src/app/model/login.model';
import { RouterTestingModule } from '@angular/router/testing';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;

  function updateForm(userName: any, userPassword: any) {
    fixture.componentInstance.form.controls['username'].setValue(userName);
    fixture.componentInstance.form.controls['password'].setValue(userPassword);
  }

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,ReactiveFormsModule],
      providers: [
        {provide: LoginService, useValue: loginServiceSpy},
        FormBuilder,
        { provide: Router, useValue: routerSpy }
      ],
      declarations: [LoginComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
  });

  it('created a form with username and password input and login button', () => {

    // const fixture = TestBed.createComponent(LoginComponent);

    //kiem tra dam bao cac phan tu duoc hien thi voi id tuong ung
    const username = fixture.debugElement.nativeElement.querySelector('#username');
    const password = fixture.debugElement.nativeElement.querySelector('#password');
    const loginBtn = fixture.debugElement.nativeElement.querySelector('#login-btn');

    //cho cac phan tu duoc dinh nghia
    expect(username).toBeDefined();
    expect(password).toBeDefined();
    expect(loginBtn).toBeDefined();
  });

  it('Display Username Error Msg when Username is blank', () => {

    //chay mac dinh cho cac value trong input bang 2 hang so cua model
    updateForm(blankUser.username, validUser.password);
    //chay thay doi cho update
    fixture.detectChanges();
​
    //khai bao hang so button
    const button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    
​
    //khai bao hang so usename
    const usernameErrorMsg: HTMLSpanElement  = fixture
    .debugElement.nativeElement.querySelector('#username-error-msg');

    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('Please enter username.');
  });

  it('Display Password Error Msg when Password is blank', () => {
     //chay mac dinh cho cac value trong input bang 2 hang so cua model
    updateForm(validUser.username, blankUser.password);
    //chay thay doi cho update
    fixture.detectChanges();
​
    //khai bao hang so button
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
​
    //khai bao hang so password
    const passwordErrorMsg = fixture.debugElement.nativeElement
    .querySelector('#password-error-msg');
    
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Please enter password');
  });

  it('Display Both Username & Password Error Msg when both field is blank', () => {
    
    updateForm(blankUser.username, blankUser.password);
    fixture.detectChanges();
​
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
​
    const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('#username-error-msg');
    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#password-error-msg');
​
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('Please enter username');
​
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Please enter password');
  });

  

});
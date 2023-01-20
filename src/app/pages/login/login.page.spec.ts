import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { loginReducer } from 'src/store/login/login.reducers';

import { AppState } from './../../../store/AppState';
import { LoadingState } from './../../../store/loading/LoadingState';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from './../../../store/login/LoginActions';
import { LoginState } from './../../../store/login/LoginState';
import { AppRoutingModule } from './../../app-routing.module';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: any;
  let store: Store<AppState>
  let toastController: ToastController

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
      StoreModule.forRoot([]),
      StoreModule.forFeature("loading", loadingReducer),
      StoreModule.forFeature("login", loginReducer)]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
    toastController = TestBed.inject(ToastController)

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create form on init', ()=>{
    component.ngOnInit();
    expect(component.form).not.toBeUndefined();
  })

  it('should go to home page on login', () => {
    spyOn(router, 'navigate');

    component.login();

    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should go to register page on register', () => {
    spyOn(router, 'navigate');

    component.register();

    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should recover email/password on forgot email/password', () => {
    fixture.detectChanges();
    component.form.get('email')?.setValue("valid@email.com");
    page.querySelector("recoverPasswordButton").click();
    store.select('login').subscribe(LoginState => {
      expect(LoginState.isRecoveredPassword).toBeTruthy();
    })
  });

  it('should show loading when recovering password', () => {
    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.select('loading').subscribe(LoadingState => {
      expect(LoadingState.show).toBeTruthy();
    })

  });

  it('should hide loading and show sucess message when has recovered password', () =>{
    spyOn(toastController, 'create');

    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordSuccess());
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  })
  it('should hide loading and show error message when error on recovered password', () =>{
    spyOn(toastController, 'create');


    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordFail({error: "message"}));
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

});
})

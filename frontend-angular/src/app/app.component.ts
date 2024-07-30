import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbThemeModule,   NbLayoutModule,
  NbSidebarModule, // NbSidebarModule.forRoot(), //if this is your app.module
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule,
  NbToastrService, } from '@nebular/theme';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

  export const NEBULAR_COMPONENTS = [
    NbLayoutModule,
    NbSidebarModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NbFormFieldModule,
    NbButtonModule,
    NbSpinnerModule,
    NbEvaIconsModule,
  ]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...NEBULAR_COMPONENTS,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  form: FormGroup;
  title = 'nebular17';

  loading = false;
  loaded = false;
  serverError = {
    status: 0,
    message: ''
  };

  authState$: Observable<any> | undefined;
  private destroy$ = new Subject<void>();
  authService = inject(AuthenticationService);

  fb = inject(FormBuilder);
  toastService = inject(NbToastrService);

  constructor() {
    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    }, { validator: this.passwordMatchValidator })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  login(event: any) {
    if (!this.form.valid) {
      return;
    }
    this.authState$ = this.authService.register(this.form.value);
    this.authState$.pipe(
      takeUntil(this.destroy$)
    ) .subscribe((data) => {
      if (data) {
        this.toastService.success('Usuario Registrado exitosamente', 'Registro Exitoso');
      }
    })
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'mismatch': true };
    }
    return null;
  }

}

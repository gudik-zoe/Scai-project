import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(private fb: FormBuilder, private auth: AuthService) {}
  resetPasswordForm: FormGroup;
  confirmTemporaryPassword: boolean = false;
  temporaryPassword: String;
  loading: boolean = false;
  email: string;

  fillResetPasswordForm() {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  checkTemporaryPassword() {
    this.loading = true;
    this.auth.checkTempPassword(this.temporaryPassword).subscribe((data) => {
      console.log(data);
      if (data) {
        this.loading = false;
        this.confirmTemporaryPassword = true;
      } else {
        this.loading = false;
        console.log('Wrong pass');
      }
    });
  }

  resetThePassword() {}

  ngOnInit(): void {
    this.fillResetPasswordForm();
  }
}

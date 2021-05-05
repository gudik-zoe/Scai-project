import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  errorPhrase: string;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private auth: AuthService
  ) {}

  @Input() email: string;
  loading: boolean;
  resetPasswordForm: FormGroup;
  fillResetPasswordForm() {
    this.resetPasswordForm = this.fb.group({
      tempPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  @Output() goToLogin = new EventEmitter<boolean>();

  checkTempPassword() {
    this.errorPhrase = null;
    this.loading = true;
    this.auth.checkTempPassword(this.resetPasswordForm.value).subscribe(
      (data) => {
        if (data) {
          this.loading = false;
          this.snackBar.open('password updated succesfully', '', {
            duration: 4000,
            panelClass: 'snackbar',
          });
          this.errorPhrase = null;
          this.goToLogin.next(true);
        }
      },
      (error) => {
        this.errorPhrase = error.error.message;
        this.snackBar.open(this.errorPhrase, '', {
          duration: 3000,
          panelClass: 'snackbar',
        });

        this.loading = false;
      }
    );
  }

  ngOnInit(): void {
    this.fillResetPasswordForm();
  }
}

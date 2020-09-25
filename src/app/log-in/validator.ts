import { AbstractControl } from '@angular/forms';

export class Custome {
  static PasswordConfirmation(control: AbstractControl) {
    let password = control.get('password').value;
    let confirmPassword = control.get('confirmPassword').value;
    if (password !== confirmPassword) {
      control.get('confirmPassword').setErrors({ customeError: true });
    } else {
      return null;
    }
  }
  static changePassword(control: AbstractControl) {
    let password = control.get('password').value;
    let confirmPassword = control.get('confirmNewPassword').value;
    if (password !== confirmPassword) {
      control
        .get('confirmNewPassword')
        .setErrors({ changePasswordError: true });
    } else {
      return null;
    }
  }
}

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
    let confirmPassword = control.get('confirmPassword').value;
    if (password !== confirmPassword) {
      control.get('confirmPassword').setErrors({ changePasswordError: true });
    } else {
      return null;
    }
  }
  static passwordPattern(control: AbstractControl) {
    let password = control.get('password').value;
    let passPattern = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@[-`{-~]).{6,64}$'
    );
    if (!passPattern.test(password)) {
      control.get('password').setErrors({ passwordPatternError: true });
    } else {
      return null;
    }
  }
}

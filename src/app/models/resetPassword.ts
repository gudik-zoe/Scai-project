export class resetPassword {
  tempPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  constructor(
    tempPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) {
    (this.tempPassword = tempPassword),
      (this.newPassword = newPassword),
      (this.confirmNewPassword = confirmNewPassword);
  }
}

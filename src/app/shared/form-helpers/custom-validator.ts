import { FormGroup } from '@angular/forms';

export class CustomValidator {
  static matchPasswordValidator(fg: FormGroup) {
    if (fg.get('passwordConfirmation') === null) {
      return null;
    }
    if ((fg.get('passwordConfirmation').value !== '') &&
      (fg.get('password').value !== fg.get('passwordConfirmation').value)) {
      fg.get('passwordConfirmation').setErrors({'mismatch': true});
      return true;
    } else {
      return (null);
    }
  }
}

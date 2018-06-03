export class ValidationMessages {

  static getValidationMessages() {
    return {
      'name': [
        { type: 'required', message: 'Name is required'}
      ],
      'email': [
        { type: 'required', message: 'Email is required' },
        { type: 'pattern', message: 'Enter a valid email' }
      ],
      'password': [
        { type: 'required', message: 'Password is required' },
        { type: 'minlength', message: 'Password must be at least 8 characters long' },
      ],
      'confirm_password': [
        { type: 'required', message: 'Confirm password is required' },
        { type: 'mismatch', message: 'Password not match' },
      ]
    };
  }

}

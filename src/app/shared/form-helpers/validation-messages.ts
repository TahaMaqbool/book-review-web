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
      ],
      'title': [
        { type: 'required', message: 'Title is required'}
      ],
      'description': [
        { type: 'required', message: 'Description is required'}
      ],
      'author': [
        { type: 'required', message: 'Author is required'}
      ],
      'category': [
        { type: 'required', message: 'Category is required'}
      ],
      'file': [
        { type: 'required', message: 'File is required'}
      ]
    };
  }

}

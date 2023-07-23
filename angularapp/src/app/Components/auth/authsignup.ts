import { AbstractControl, Validators } from '@angular/forms';

export const validationRules = {
  username: [
    { type: 'required', message: 'Username is required' },
    { type: 'minlength', message: 'Username must be at least 4 characters long' }
  ],
  email: [
    { type: 'required', message: 'Email is required' },
    { type: 'pattern', message: 'Invalid email format' }
  ],
  password: [
    { type: 'required', message: 'Password is required' },
    { type: 'minlength', message: 'Password must be at least 6 characters long' }
  ],
  confirmPassword: [
    { type: 'required', message: 'Confirm password is required' },
    { type: 'passwordMismatch', message: 'Passwords do not match' }
  ],
  mobileNumber: [
    { type: 'required', message: 'Mobile number is required' },
    { type: 'pattern', message: 'Invalid mobile number format' }
  ],
  userRole: [
    { type: 'required', message: 'User role is required' }
  ]
};

export function passwordMatchValidator(formGroup: AbstractControl) {
  const password = formGroup.get('password')!.value;
  const confirmPassword = formGroup.get('confirmPassword')!.value;
  if (password !== confirmPassword) {
    formGroup.get('confirmPassword')?.setErrors({ 'passwordMismatch': true });
    return { 'passwordMismatch': true };
  } else {
    return null;
  }
}

export const formBuilderConfig = {
  username: ['', Validators.compose([
    Validators.required,
    Validators.minLength(4)
  ])],
  email: ['', Validators.compose([
    Validators.required,
    Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}')
  ])],
  password: ['', Validators.compose([
    Validators.required,
    Validators.minLength(6)
  ])],
  confirmPassword: ['', Validators.compose([
    Validators.required
  ])],
  mobileNumber: ['', Validators.compose([
    Validators.required,
    Validators.pattern('[0-9]{10}')
  ])],
  userRole: ['', Validators.required],

};
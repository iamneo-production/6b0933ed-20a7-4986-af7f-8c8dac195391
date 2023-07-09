import { Validators } from "@angular/forms";

export const validationRules = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Invalid email format' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 6 characters long' }
    ],
    userRole: [
      { type: 'required', message: 'User role is required' }
    ]
  };
  export const formBuilderConfig = {
    email: ['', Validators.compose([
      Validators.required,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}')
    ])],
    password: ['', Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])],
    userRole: ['', Validators.required]
  };
  
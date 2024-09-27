# Forms

Angular provides two powerful approaches to handling forms in web applications: `Template-Driven Forms` and `Reactive Forms`. Each approach has its benefits and is suited for different use cases. This guide will delve deeper into each type of form, including how to implement custom validators.

## Template-Driven Forms

Template-Driven Forms are ideal for simple scenarios and are easier to set up but less flexible than Reactive Forms. They leverage the power of Angular's directives to work seamlessly with forms.

#### Advantages
- **Simple to Implement**: Utilize directives like `ngModel` to bind data.
- **Automatic Form Model Generation**: Angular creates form controls and models implicitly.
- **Suitable for Simple Scenarios**: Best for quick forms like simple contact forms.

## Creating a Template-Driven Form
You need to import `FormsModule` in the desired component to get started with Template-Driven Forms:

```typescript
// Import FormsModule in your component
// app.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class AppComponent {
  onSubmit(form: NgForm) {
    // Form submission logic
    console.log(form.value);
  }
}
```

##### HTML for Template-Driven Form
```html
<!-- app.component.html -->
<form #userForm="ngForm" (ngSubmit)="onSubmit(userForm)">
  <input type="text" name="username" ngModel required>
  <button type="submit" [disabled]="userForm.invalid">Submit</button>
</form>
```
#### Explanation
- **`<form>` Tag**: The container for the form elements. It uses the `ngForm` directive to create and track the form object in Angular.
- **`#userForm="ngForm"`**: This syntax declares a local template variable `userForm`. It provides a way to access form properties and methods in the template.
- **`(ngSubmit)`**: This event binding tells Angular to call the `onSubmit()` method when the form is submitted.
- **`<input>` Tag**: Defines input fields within the form. The `ngModel` directive binds the value of the input to a variable in the component.
- **`[disabled]="userForm.invalid"`**: Disables the submit button if the form is invalid.

## Validation in Template-Driven Forms
Angular allows you to use built-in validators such as `required`, `minlength`, `maxlength`, and more directly in your template:

```html
<input type="text" name="email" ngModel required email>
```

## Reactive Forms

Reactive Forms provide a model-driven approach to handling form inputs whose values change over time. They offer more predictability and scalability via an immutable model.

#### Pros
- **More Control**: Fine-grained control over form behaviors and state transitions.
- **Scalability**: Better suited for complex scenarios with dynamic form inputs.
- **Immutability**: Embrace the immutable data pattern for robust data handling.

#### Setting Up Reactive Forms
First, ensure you have `ReactiveFormsModule` imported directly into the **standalone component** that needs form functionality

```typescript
// Import FormsModule directly in the standalone component
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],  // Import ReactiveFormsModule here
})
export class ContactFormComponent {}
```

##### Building a Reactive Form
Here’s how you construct a form with various controls:

```typescript
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [ReactiveFormsModule],  // Import ReactiveFormsModule here
})
export class ProfileFormComponent {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });

  onSubmit() {
    console.log(this.profileForm.value);
  }
}
```
#### HTML for Reactive Forms
```html
<h2>Profile Form</h2>
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
    <label>
        First Name:
        <input type="text" formControlName="firstName">
    </label>
    <label>
        Last Name:
        <input type="text" formControlName="lastName">
    </label>
    <button type="submit">Submit</button>
</form>
```

#### HTML Explanation
- **`[formGroup]`**: Binds the form group instance created in the component class to the form element.
- **`formControlName`**: Connects an input to a form control within the named form group.
- **`(ngSubmit)`**: Captures the form submission event and calls the `onSubmit()` method defined in the component class.
- **ReactiveFormsModule Import:** The ReactiveFormsModule is imported directly into the imports array of the component.

## Custom Validators in Reactive Forms
You can write custom validators to implement complex validation rules. For example, a validator that checks if a username is not taken:

```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(names: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const forbidden = names.test(control.value);
        return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
}
```

##### Using Custom Validators
Attach your custom validator to a form control in your form group:

```typescript
this.profileForm = new FormGroup({
    username: new FormControl('', [forbiddenNameValidator(/admin/)]),
});
```
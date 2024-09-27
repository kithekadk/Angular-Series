import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; // For Template-Driven Forms
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'; // For Reactive Forms
import { forbiddenNameValidator } from '../../validators/forbidden-name.validator';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {
  // For Template-Driven Form
  templateFormData: any = {};

  // For Reactive Form
  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    username: new FormControl('', [Validators.required, forbiddenNameValidator(/admin/)])
  });
  
  reactiveFormData: any = {};

  onTemplateFormSubmit(form: NgForm) {
    this.templateFormData = form.value;
    console.log('Template-Driven Form Submitted:', this.templateFormData);
  }

  onReactiveFormSubmit() {
    this.reactiveFormData = this.profileForm.value;
    console.log('Reactive Form Submitted:', this.reactiveFormData);
  }
}
